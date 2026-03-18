import type { ReactNode } from 'react'

interface BaseFormFieldProps {
  label: string
  children: ReactNode
  className?: string
  required?: boolean
}

export default function BaseFormField({
  label,
  children,
  className = '',
  required = false,
}: BaseFormFieldProps) {
  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      {children}
    </div>
  )
}
