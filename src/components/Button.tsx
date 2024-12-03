import { cva,VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"


export const buttonStyles = cva(["transition-colors"],{
    variants:{
        variant:{
            default:["bg-secondary-Default","hover:bg-secondary-hover"],
            ghost:["hover:bg-secondary-hover"],
            Dark:["bg-secondary-dark","hover:bg-secondary-dark-hover","text-secondary-Default"]
            
        },
        size:{
            default:["p-2","rounded"],
            icon:["h-10","w-10","rounded-full", "flex","justify-center","items-center","p-2.5"]
        }
    },
    defaultVariants:{
        variant:"default",
        size:"default"
    },
})

type buttomProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

export function Button({className,variant,size,...arg}:buttomProps){
    return <button {...arg} className={twMerge(buttonStyles({variant,size}),className)} />
}