import { createContext, useCallback, useContext, useState } from "react";

type UserType = {
    id: string;
};

type AuthContextType = {
    user: undefined | null | UserType;
    isConnected: boolean;
    login: (email: string, password: string) => Promise<any>;
    signup: (email: string, password: string) => Promise<any>;
};

const defaultValue = {
    user: undefined,
    isConnected: false,
    login: async (email: string, password: string) => {},
    signup: async (email: string, password: string) => {},
} satisfies AuthContextType;

const authContext = createContext<AuthContextType>(defaultValue);

export const useAuthContext = () => {
    return useContext(authContext);
};

interface Props {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [user] = useState<null | undefined | UserType>(undefined);
    const isConnected = !!user?.id;

    const login = useCallback(
        async (email: string, password: string) => {},
        [isConnected]
    );

    const signup = useCallback(
        async (email: string, password: string) => {},
        [isConnected]
    );

    return (
        <authContext.Provider value={{ user, isConnected, login, signup }}>
            {children}
        </authContext.Provider>
    );
};
