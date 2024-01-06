import { ReactNode, ButtonHTMLAttributes } from "react";
import LoadingSvg from "./LoadingSvg";
import { cn } from "@/lib/utils";

type ButtonProps = {
    children?: ReactNode;
    loading?: boolean;
    loadingSize?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    children,
    className,
    loading = false,
    loadingSize,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={cn("relative disabled:opacity-60", className)}
        >
            {loading && <LoadingSvg loadingSize={loadingSize} />}
            {children}
        </button>
    );
}