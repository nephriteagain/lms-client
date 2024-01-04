
import { useContext, createContext, useState, ReactNode } from "react";
import { constants } from "../constants";
import { LoginSchema, Login } from "../schemas";

const AuthContext = createContext<{}>({})

export function AuthProvider({children}: {children: ReactNode}) {
    const [ accessToken, setAccessToken ] = useState<string|null>(null)

    async function login({email,password}: Login) : Promise<number|undefined> {
        try {
            LoginSchema.parse({email, password})
            const response = await fetch(`${constants.server}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({email, password})                
            })
            if (response.ok) {
                const data : Awaited<{acess_token:string}> = await response.json()            
                setAccessToken(data.acess_token)
            }
            return response.status
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            login,
            accessToken,
        }}>
        {children}
        </AuthContext.Provider>
    )
}