import { useEffect, useState } from "react";
import { useLocation, useFetcher, Link } from "react-router-dom";
import Button from "@/components/utils/Button";
import { dev } from "@/constants";

import { positiveInt, nonNegativeInt, totalSum } from "@/schemas";

// TODO: extract all this logic to a hook
export default function InventoryUpdate() {
    const location = useLocation();
    const fetcher = useFetcher();

    const { title, total, borrowed, available } = location.state;
    const [t, setT] = useState<number>(total);
    const [a, setA] = useState<number>(available);
    const [b, setB] = useState<number>(borrowed);

    const [noNegativeNum, setNoNegativeNum] = useState(true);
    const [totalNonZero, setTotalNonZero] = useState(true);
    const [totalEqual, setTotalEqual] = useState(true);

    const [difference, setDifference] = useState(a + b - t);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

    useEffect(() => {
        try {
            positiveInt.parse(t);
            setTotalNonZero(true);
        } catch (error) {
            dev.log("positive int");
            setTotalNonZero(false);
        }
    }, [t]);

    useEffect(() => {
        try {
            nonNegativeInt.parse(a);
            nonNegativeInt.parse(b);
            nonNegativeInt.parse(t);
            setNoNegativeNum(true);
        } catch (error) {
            dev.log("negative total");
            setNoNegativeNum(false);
        }
    }, [t, a, b]);

    useEffect(() => {
        try {
            totalSum.parse({ total: t, args: [a, b] });
            setTotalEqual(true);
        } catch (error) {
            dev.log("total not eq");
            setTotalEqual(false);
        }
    }, [t, a, b]);

    useEffect(() => {
        setDifference(a + b - t);
    }, [t, a, b]);

    useEffect(() => {
        if (noNegativeNum && totalNonZero && totalEqual && difference === 0) {
            dev.log("form data passed!");
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [noNegativeNum, totalNonZero, totalEqual, difference]);

    return (
        <div className="fixed top-0 left-0">
            <Link
                to={".."}
                className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60"
            />
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
                    <input
                        type="number"
                        className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                        name="available"
                        value={a}
                        onChange={(e) => setA(Number(e.currentTarget.value))}
                    />
                </div>
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">borrowed</label>
                    <input
                        type="number"
                        className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                        name="borrowed"
                        value={b}
                        onChange={(e) => setB(Number(e.currentTarget.value))}
                    />
                </div>
                <div className="flex gap-2 justify-between w-full">
                    <label className="font-semibold">total</label>
                    <input
                        type="number"
                        className="w-1/4 text-center p-[2px] rounded-md shadow-inner shadow-gray-400"
                        name="total"
                        value={t}
                        onChange={(e) => setT(Number(e.currentTarget.value))}
                    />
                </div>
                <div className="flex flex-col items-center text-sm  w-full text-red-800">
                    <p className={totalNonZero ? `invisible` : "visible"}>
                        total should be greater than zero
                    </p>
                    <p className={noNegativeNum ? ` invisible` : "visible"}>
                        negative numbers is not allowed
                    </p>
                    <p className={totalEqual ? ` invisible` : "visible"}>
                        total should equals to available and borrowed
                    </p>
                    <p className={difference === 0 ? `invisible` : "visible"}>
                        difference {difference}
                    </p>
                </div>
                <div className="flex flex-row gap-8">
                    <Button
                        type="submit"
                        className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 px-4 py-1  font-semibold"
                        loading={fetcher.state === "submitting"}
                        disabled={disableSubmit}
                    >
                        Save
                    </Button>
                    <Link
                        to=".."
                        className="bg-red-300 hover:bg-red-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 px-4 py-1  font-semibold"
                    >
                        Cancel
                    </Link>
                </div>
            </fetcher.Form>
        </div>
    );
}
