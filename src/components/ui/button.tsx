import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link" | "primary"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    {
                        "bg-gray-900 text-gray-50 hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200": variant === "default",
                        "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25": variant === "primary",
                        "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 dark:border-white/10 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800": variant === "outline",
                        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/5 dark:text-gray-100": variant === "ghost",
                        "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400": variant === "link",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-12 rounded-xl px-8": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
