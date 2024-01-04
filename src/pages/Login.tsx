export default function Login() {
    return ( 
        <div className="w-screen flex-grow flex flex-col items-center gap-8 pt-28">
            <h1 className="font-bold text-3xl">Signin to continue</h1>
            <form className="flex flex-col gap-4 bg-blue-200 h-fit p-8 rounded-lg shadow-lg">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-xl">Email</label>
                    <input type="email" name="email" className="bg-gray-200  px-3 py-1 rounded-md shadow-md" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-xl">Password</label>
                    <input type="password" name="password" className="bg-gray-200  px-3 py-1 rounded-md shadow-md"  />
                </div>
            </form>
        </div>
    )
}