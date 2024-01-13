import Button from "@/components/utils/Button";
import { useFetcher } from "react-router-dom";

export default function Register() {
    const fetcher = useFetcher();
    const Form = fetcher.Form;

    return (
        <div className="w-full h-[500px] flex items-center justify-center shadow-lg">
            <Form
                className="w-[350px] bg-slate-200 p-4 rounded-lg flex flex-col gap-6"
                method="post"
                action=""
            >
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm" htmlFor="name">
                        name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-5/6 px-3 py-1 rounded-md shadow-inner shadow-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm" htmlFor="age">
                        age
                    </label>
                    <input
                        type="number"
                        name="age"
                        required
                        className="w-5/6 px-3 py-1 rounded-md shadow-inner shadow-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm" htmlFor="email">
                        email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-5/6 px-3 py-1 rounded-md shadow-inner shadow-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm" htmlFor="password">
                        password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-5/6 px-3 py-1 rounded-md shadow-inner shadow-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm" htmlFor="secret">
                        secret key
                    </label>
                    <input
                        type="password"
                        name="secret"
                        required
                        className="w-5/6 px-3 py-1 rounded-md shadow-inner shadow-gray-400"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-fit"
                    disabled={fetcher.state === "submitting"}
                >
                    register
                </Button>
            </Form>
        </div>
    );
}
