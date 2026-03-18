import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function BaseButton({ children, className = '', ...props }: BaseButtonProps) {
  return (
    <button className={`base-button ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
