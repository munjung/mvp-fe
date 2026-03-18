import type { TextareaHTMLAttributes } from 'react'

type BaseTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function BaseTextarea({ className = '', ...props }: BaseTextareaProps) {
  return <textarea className={`base-textarea ${className}`.trim()} {...props} />
}
