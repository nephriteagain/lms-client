import { FormEvent, useState, useEffect } from "react"
import { useAuthContext } from "../providers/AuthProvider"
import { LoginSchema, Login as LoginType } from "../schemas"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ disabled, setDisabled ] = useState(true)

    const { login } = useAuthContext()

    const navigate = useNavigate()    

    async function loginUser(e: FormEvent, loginCred: LoginType) {
        e.preventDefault()

        try {
            LoginSchema.parse(loginCred)            
        } catch (error) {
            console.error(error)
        }

        try {
          const responseStatus = await login(loginCred)
          if (responseStatus === 200) {
            navigate('/', {replace:true})
          }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        try {
            LoginSchema.parse({email,password})
            setDisabled(false)
        } catch (error) {
            setDisabled(true)
        }

    }, [ email, password ])

    return ( 
        <div className="w-screen flex-grow flex flex-col items-center gap-8 pt-28">
            <h1 className="font-bold text-3xl">Signin to continue</h1>
            <form className="w-[300px] flex flex-col items-center gap-4 bg-blue-200 h-fit p-8 rounded-lg shadow-lg" onSubmit={(e) => loginUser(e, {email,password})}>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-xl">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="bg-gray-200 px-3 py-1 rounded-md shadow-md" 
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-xl">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className=" bg-gray-200  px-3 py-1 rounded-md shadow-md"  
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />                        
                </div>
                <div className="pt-4 py-2">
                    <input 
                        type="submit" 
                        value='login' 
                        className="disabled:opacity-60 bg-green-400 w-fit px-4 py-2 text-lg font-semibold shadow-md rounded-md hover:scale-115 hover:px-6 hover:bg-green-500 transition-all duration-150"
                        disabled={disabled}
                    />
                </div>
            </form>
        </div>
    )
}