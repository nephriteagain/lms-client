import { useLocation, useFetcher, Link, useNavigate } from "react-router-dom"
import Button from "@/components/utils/Button"

export default function InventoryUpdate() {
    const location = useLocation()
    const fetcher = useFetcher()
    const navigate = useNavigate()
    

    const { title, total, borrowed, available } = location.state

    return (
        <div className="fixed top-0 left-0">
            <div 
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60" 
            onClick={() => {
                navigate('..')
            }}/>
            <fetcher.Form 
                className="flex flex-col items-center gap-4 z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-6 rounded-lg shadow-inner shadow-gray-500"
                action=""
                method="patch"
            >
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-xl">Update Inventory Data</h1>
                    <p className="text-lg font-semibold">{title}</p>
                </div>                
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">available</label>
                    <input type="number"
                    className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                    name="available" defaultValue={available} />
                </div>
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">borrowed</label>
                    <input type="number"
                    className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                    name="borrowed" defaultValue={borrowed} />
                </div>
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">total</label>
                    <input type="number"
                    className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                    name="total" defaultValue={total} />                    
                </div>
                <div className="flex flex-row gap-8">
                    <Button 
                    type="submit" 
                    className="bg-green-300 hover:bg-green-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 px-4 py-1  font-semibold"
                    >
                            Save
                    </Button                    >
                    <Link to='..' className="bg-red-300 hover:bg-red-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 px-4 py-1  font-semibold">Cancel</Link>
                </div>

            </fetcher.Form>
        </div>
    )
}