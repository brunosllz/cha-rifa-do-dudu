import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex py-4 items-center h-14 justify-center gap-2 bg-pearl-bush-500 font-medium rounded-md w-full transition-colors hover:bg-pearl-bush-400 text-puce-50 disabled:opacity-60',
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
