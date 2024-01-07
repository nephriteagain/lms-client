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
            className={cn("relative disabled:opacity-60", className)}
            // if document loading, auto disable, used to to prevent multiple fetch
            disabled={loading || disabled}
            {...props}
        >
            {loading && <LoadingSvg loadingSize={loadingSize} />}
            {children}
        </button>
    );
});
