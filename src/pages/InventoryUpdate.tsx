import { useEffect, useState, ChangeEvent } from "react"
import { useLocation, useFetcher, Link, useNavigate } from "react-router-dom"
import Button from "@/components/utils/Button"

import { positiveInt, nonNegativeInt, totalSum } from "@/schemas"

export default function InventoryUpdate() {
    const location = useLocation()
    const fetcher = useFetcher()
    const navigate = useNavigate()    

    const { title, total, borrowed, available } = location.state
    const [ t, setT ] = useState<number>(total)
    const [ a, setA ] = useState<number>(available)
    const [ b, setB ] = useState<number>(borrowed)
    const [ disableSubmit, setDisableSubmit ] = useState<boolean>(true)

    /**
     * auto updates the available input if there is a increase in total
     */
    function onTotalChange(e:ChangeEvent<HTMLInputElement>) {
        const num = parseInt(e.currentTarget.value);
        if (isNaN(num)) return;
        const previousDiff = t - a;
        const currentDiff = num - a;
        if (currentDiff > previousDiff) {
            const discrepancy = currentDiff - previousDiff;            
            setA(discrepancy)
        }
        setT(num)
    }

    useEffect(() => {
        
        try {
            positiveInt.parse(t)
            nonNegativeInt.parse(a)
            nonNegativeInt.parse(b)
            totalSum.parse({total:t, args: [a,b]})
            setDisableSubmit(false)
        } catch (error) {
            setDisableSubmit(true)
        }
    }, [t, a, b])

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
                    name="available" value={a} onChange={(e) => setA(Number(e.currentTarget.value))} />
                </div>
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">borrowed</label>
                    <input type="number"
                    className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                    name="borrowed" value={b} onChange={(e) => setB(Number(e.currentTarget.value))} />
                </div>
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">total</label>
                    <input type="number"
                    className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                    name="total" value={t} onChange={onTotalChange} />                    
                </div>
                <div className="flex flex-row gap-8">
                    <Button 
                    type="submit" 
                    className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 px-4 py-1  font-semibold"
                    loading={fetcher.state === 'submitting'}
                    disabled={disableSubmit}
                    >
                            Save
                    </Button                    >
                    <Link to='..' className="bg-red-300 hover:bg-red-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 px-4 py-1  font-semibold">
                        Cancel
                    </Link>
                </div>

            </fetcher.Form>
        </div>
    )
}