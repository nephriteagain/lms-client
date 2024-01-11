import { useFetcher } from "react-router-dom"
import Button from "@/components/utils/Button"

import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"


export default function BorrowNew() {
    const fetcher = useFetcher()

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <fetcher.Form>

                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}