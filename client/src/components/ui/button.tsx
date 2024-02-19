import * as React from "react"

import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
      {
        "bg-sky-500 hover:bg-sky-700 text-white ring-offset-sky-700":
          variant === "primary",
        "bg-red-500 hover:bg-red-700 text-white ring-offset-red-700":
          variant === "destructive",
        "border border-input bg-white hover:bg-slate-50": variant === "outline",
      },
      className
    )

    return <button className={classes} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button }
