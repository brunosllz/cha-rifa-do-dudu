import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className="flex py-4 items-center h-14 justify-center gap-2 bg-peral-bush-500 font-medium rounded-md w-full transition-colors hover:bg-peral-bush-400 text-puce-50 disabled:opacity-60"
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
