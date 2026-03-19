import { useMemo, useRef, useState, useEffect } from 'react'

type Option = {
  label: string
  value: string
}

type BaseMultiSelectProps = {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export default function BaseMultiSelect({
  options,
  value,
  onChange,
  placeholder = '선택',
}: BaseMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = useMemo(() => {
    if (value.length === 0) return placeholder

    const selectedOptions = options.filter((opt) => value.includes(opt.value))
    if (selectedOptions.length <= 2) {
      return selectedOptions.map((opt) => opt.label).join(', ')
    }

    return `${selectedOptions.length}개 선택`
  }, [options, value, placeholder])

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue))
      return
    }

    onChange([...value, optionValue])
  }

  return (
    <div className="base-multi-select" ref={wrapRef}>
      <button
        type="button"
        className="base-select-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <span>▾</span>
      </button>

      {open && (
        <div className="base-multi-select-dropdown">
          {options.map((option) => {
            const checked = value.includes(option.value)

            return (
              <label key={option.value} className="base-multi-select-item">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleToggle(option.value)}
                />
                <span>{option.label}</span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
