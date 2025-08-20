import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import type { UserType } from "../../features/auth/types/user";
import userService from "../../features/auth/services/user.service";
import { STORAGE_TOKEN_KEY } from "../config/storage";
import { displayMsg } from "../../shared/utils/toast";

type AuthContextType = {
    user: undefined | null | UserType;
    isConnected: boolean;
    role: string | undefined;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
};

const defaultValue = {
    user: undefined,
    isConnected: false,
    role: undefined,
    login: async () => {},
    logout: () => undefined,
} satisfies AuthContextType;

const authContext = createContext<AuthContextType>(defaultValue);

export const useAuthContext = () => {
    return useContext(authContext);
};

interface Props {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<null | undefined | UserType>(undefined);
    const isConnected = !!user?.id;
    const role = user?.role;

    const login = useCallback(
        async (email: string, password: string) => {
            if (isConnected) return;
            await userService.login(email, password);
            retrieveProfile();
        },
        [isConnected]
    );

    const logout = useCallback(async () => {
        try {
            await userService.logout();
            setUser(null);
        } catch (e) {
            displayMsg("An error occurred", "error");
        }
    }, []);

    const retrieveProfile = useCallback(async () => {
        try {
            const profile = await userService.getSelf();
            setUser(profile);
        } catch (e) {
            logout();
        }
    }, []);

    useEffect(() => {
        retrieveProfile();
    }, []);

    return (
        <authContext.Provider
            value={{ user, isConnected, login, logout, role }}
        >
            {children}
        </authContext.Provider>
    );
};
