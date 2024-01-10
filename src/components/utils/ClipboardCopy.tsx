import { IoCopyOutline } from "react-icons/io5";
import { copyToClipboard } from "@/lib/utils";
import { HTMLAttributes, SVGAttributes } from "react";
import { cn } from "@/lib/utils"
type ClipboardCopyProps = HTMLAttributes<HTMLSpanElement> & {
    copyItem: string;
    svgProps?: SVGAttributes<SVGAElement>
}
export default function ClipboardCopy({copyItem, svgProps, className, ...props}: ClipboardCopyProps) {
    
    return (
        <span 
        className={cn("w-7 me-1 flex items-center justify-center px-1 aspect-square rounded-full hover:bg-gray-100 text-xl hover:scale-105 active:scale-95 transition-all duration-200", className)}
        onClick={(e) => copyToClipboard(e, copyItem)}
        {...props}
        >
            <IoCopyOutline {...svgProps} />
        
        </span>
    )
}