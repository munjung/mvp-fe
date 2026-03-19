import type { InputHTMLAttributes } from 'react'

type BaseCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function BaseCheckbox({ label, className = '', ...props }: BaseCheckboxProps) {
  return (
    <label className={`base-checkbox ${className}`.trim()}>
      <input type="checkbox" className="base-checkbox-input" {...props} />
      {label && <span className="base-checkbox-label">{label}</span>}
    </label>
  )
}
