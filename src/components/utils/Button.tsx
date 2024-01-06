import { ReactNode, HTMLAttributes, forwardRef, ForwardedRef } from "react";
import LoadingSvg from "./LoadingSvg";
import { cn } from "@/lib/utils";

type ButtonProps = {
    children?: ReactNode;
    loading?: boolean;
    loadingSize?: number;
} & HTMLAttributes<HTMLButtonElement>;

export default forwardRef(function Button({
    children,
    className,
    loading = false,
    loadingSize,            
    ...props
}: ButtonProps, ref?: ForwardedRef<HTMLButtonElement>) {
    return (
        <button
            ref={ref}
            className={cn("relative disabled:opacity-60", className)}
            {...props}
        >
            {loading && <LoadingSvg loadingSize={loadingSize} />}
            {children}
        </button>
    );
})
