import type { InputHTMLAttributes } from 'react'

type BaseInputProps = InputHTMLAttributes<HTMLInputElement>

export default function BaseInput({ className = '', ...props }: BaseInputProps) {
  return <input className={`base-input ${className}`.trim()} {...props} />
}
