
import { useState } from "react"
import { useLocation, useFetcher } from "react-router-dom"
import { Book } from "@/schemas"

import { generateRandomString } from "@/lib/utils"

import InputList from "@/components/utils/InputList"
import Button from "@/components/utils/Button"

export default function BookUpdate() {
    
    const fetcher = useFetcher()
    const location =  useLocation() 
    const bookToUpdate = location.state as Book
    
    const { title, authors, yearPublished } = bookToUpdate
    const [ inputList, setInputList ] = useState(Array.from(authors, () => generateRandomString()))    

    const [ loading, setLoading ] = useState(false)

    return (
        <div className="py-12">
            <div className="w-[95%] xs:w-[500px] bg-slate-300 p-6 rounded-lg shadow-lg">
                <fetcher.Form className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Title</label>
                        <input 
                        type="text" 
                        name="title" 
                        defaultValue={title} 
                        className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                        />  
                    </div>
                    <div>
                        <label>Authors</label>
                        <InputList 
                        inputList={inputList} 
                        setInputList={setInputList} 
                        defaultValue={authors}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="yearPublished">Year Published</label>
                        <input 
                        type="number" 
                        name="yearPublished" 
                        defaultValue={yearPublished} 
                        className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                        />
                    </div>
                    <div>
                        <Button 
                        className="bg-green-300 hover:bg-green-400 active:bg-green-400 px-3 py-2 rounded-md shadow-md hover:shadow-md hover:scale-105 transition-all duration-200"
                        loading={loading}
                        disabled={loading}
                        >
                            Save
                        </Button>
                    </div>
                </fetcher.Form>
            </div>
        </div>

    )
}