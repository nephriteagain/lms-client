import {  ReactNode, ButtonHTMLAttributes, useState, useLayoutEffect, useRef  } from 'react'
import LoadingSvg from './LoadingSvg'

type ButtonProps  =  {    
    children?: ReactNode;
    loading: boolean;
    loadingSize?: number
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, loading, loadingSize, ...props }: ButtonProps ) {


    return (
        <button {...props} className={`relative ${props.className}`}>
            <>
            { loading && <LoadingSvg loadingSize={loadingSize} /> }
            { children }
            </>
        </button>        
    )

}