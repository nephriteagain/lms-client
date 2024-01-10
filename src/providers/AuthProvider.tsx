import {
    useContext,
    createContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { constants, dev } from "../constants";
import { LoginSchema, Login, User } from "../schemas";
import { NavigateOptions } from "react-router-dom";

import axios from "axios";

type AuthContextType = {
    userData: User | null;
    login(
        loginCred: Login,
        callback: (link: string, options: NavigateOptions) => any,
    ): Promise<number | undefined>;
    logout(): void;
};


const AuthContext = createContext<AuthContextType>({} as AuthContextType);



export function AuthProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<User | null>(null);

    async function login(
        { email, password }: Login,
        callback: (link: string, options: NavigateOptions) => any,
    ): Promise<any> {
        try {
            LoginSchema.parse({ email, password });
            const response = await axios.post(
                `${constants.server}/auth/login`,
                {
                    email,
                    password,
                }
            );
            if (response.status === 200) {
                setUserData(response.data);
                return callback("/", { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function logout() {
        try {
            await axios.post(`${constants.server}/auth/logout`);
            setUserData(null);
        } catch (error) {
            dev.error(error);
        }
    }

    async function autoLogin(): Promise<void> {
        const response = await axios.post(
            `${constants.server}/auth/credentials`,
            {},
             
        );
        if (response.status === 200) {
            dev.log("login credentials found, logging in");
            setUserData(response.data);
        }
    }

    useEffect(() => {
        autoLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userData,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    if (!AuthContext) {
        throw new Error("missing context");
    }
    return useContext(AuthContext);
}
