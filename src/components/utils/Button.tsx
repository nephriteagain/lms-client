import {
    ReactNode,
    ButtonHTMLAttributes,
    forwardRef,
    ForwardedRef,
} from "react";
import LoadingSvg from "./LoadingSvg";
import { cn } from "@/lib/utils";

type ButtonProps = {
    children?: ReactNode;
    loading?: boolean;
    loadingSize?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default forwardRef(function Button(
    {
        children,
        className,
        loading = false,
        disabled = false,
        loadingSize,
        ...props
    }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>,
) {
    return (
        <button
            ref={ref}
            className={cn(
                "bg-green-300 px-2 py-1 rounded-lg  relative disabled:opacity-60 hover:scale-105 active:scale-95 transition-all duration-150",
                className,
            )}
            // if document loading, auto disable, used to to prevent multiple fetch
            disabled={loading || disabled}
            {...props}
        >
            {loading && <LoadingSvg loadingSize={loadingSize} />}
            {children}
        </button>
    );
});
