import { useState, useEffect } from "react";
import axios from "axios";

export function useAxiosGet<T>(link: string, initial: T): T {
    const [value, setValue] = useState<T>(initial);

    async function xhr() {
        const response = await axios.get(link);
        const data = response.data as T;
        if (response.status === 200) {
            setValue(data);
        }
    }

    useEffect(() => {
        xhr();
    }, [link]);

    return value;
}
