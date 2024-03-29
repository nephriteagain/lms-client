import { useNavigate, useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";

import { NewMemberSchema } from "@/schemas";
import Button from "@/components/utils/Button";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MemberCreate() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const fetcher = useFetcher({ key: "member_create" });
    useEffect(() => {
        try {
            NewMemberSchema.parse({ name, age, email });
            setDisabled(false);
        } catch (error) {
            setDisabled(true);
        }
    }, [name, age, email]);

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <fetcher.Form method="post" action="">
                    <AlertDialogHeader>
                        <AlertDialogTitle>New Member</AlertDialogTitle>
                        <AlertDialogDescription>
                            Create a new Member
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4 flex flex-col gap-3 w-4/6">
                        <div className="flex flex-row gap-2 justify-between items-center">
                            <label htmlFor="name" className="font-semibold">
                                name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="bg-gray-200 focus:bg-gray-300 px-3 py-1 rounded-md shadow-md "
                                required
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="flex flex-row gap-2 justify-between items-center">
                            <label htmlFor="age" className="font-semibold">
                                age
                            </label>
                            <input
                                type="number"
                                name="age"
                                className="bg-gray-200 focus:bg-gray-300 px-3 py-1 rounded-md shadow-md "
                                required
                                value={age}
                                onChange={(e) =>
                                    setAge(Number(e.currentTarget.value))
                                }
                            />
                        </div>
                        <div className="flex flex-row gap-2 justify-between items-center">
                            <label htmlFor="email" className="font-semibold">
                                email
                            </label>
                            <input
                                type="text"
                                name="email"
                                className="bg-gray-200 focus:bg-gray-300 px-3 py-1 rounded-md shadow-md "
                                required
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.currentTarget.value)
                                }
                            />
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => navigate("..")}>
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            type="submit"
                            disabled={
                                disabled || fetcher.state === "submitting"
                            }
                            loading={fetcher.state === "submitting"}
                            className="disabled:opacity-60 text-sm font-semibold"
                        >
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
