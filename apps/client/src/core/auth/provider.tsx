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

type AuthContextType = {
    user: undefined | null | UserType;
    isConnected: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
};

const defaultValue = {
    user: undefined,
    isConnected: false,
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

    const login = useCallback(
        async (email: string, password: string) => {
            if (isConnected) return;
            const response = await userService.login(email, password);
            localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
            retrieveProfile();
        },
        [isConnected]
    );

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        setUser(null);
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
        if (localStorage.getItem(STORAGE_TOKEN_KEY)) retrieveProfile();
    }, []);

    return (
        <authContext.Provider value={{ user, isConnected, login, logout }}>
            {children}
        </authContext.Provider>
    );
};
