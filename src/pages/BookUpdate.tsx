
import { useState } from "react"
import { useLocation, useFetcher } from "react-router-dom"
import { Book } from "@/schemas"

import { generateRandomString } from "@/lib/utils"

import InputList from "@/components/utils/InputList"

export default function BookUpdate() {
    
    const fetcher = useFetcher()
    const location =  useLocation() 
    const bookToUpdate = location.state as Book
    
    const { _id, title, authors, yearPublished, dateAdded } = bookToUpdate
    console.log(authors)
    const [ inputList, setInputList ] = useState(Array.from(authors, () => generateRandomString()))    
    console.log(inputList)

    return (
        <div>
            <fetcher.Form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" defaultValue={title} />                    
                </div>
                {/* authors here */}
                <InputList 
                inputList={inputList} 
                setInputList={setInputList} 
                defaultValue={authors}
                />
                <div>
                    <label htmlFor="yearPublished">Year Published</label>
                    <input type="number" name="yearPublished" defaultValue={yearPublished} />
                </div>
            </fetcher.Form>
        </div>
    )
}