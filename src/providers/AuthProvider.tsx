
import { useContext, createContext, useState, ReactNode } from "react";
import { constants } from "../constants";
import { LoginSchema, Login } from "../schemas";

type AuthContextType = {
    accessToken: string|null;
    login(loginCred: Login) : Promise<number|undefined>;
    logout() : void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({children}: {children: ReactNode}) {
    const [ accessToken, setAccessToken ] = useState<string|null>(null)

    async function login({email,password}: Login) : Promise<number|undefined> {
        try {
            LoginSchema.parse({email, password})
            const response = await fetch(`${constants.server}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data : Awaited<{access_token:string}> = await response.json()            
                setAccessToken(data.access_token)
            }
            return response.status
        } catch (error) {
            console.error(error)
        }
    }

    function logout() {
        setAccessToken(null)
        localStorage.removeItem('jwt')
    }



    return (
        <AuthContext.Provider value={{
            accessToken,
            login,
            logout,
        }}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
        if (!AuthContext) {
            throw new Error('missing context')
        }
        return useContext(AuthContext)
}