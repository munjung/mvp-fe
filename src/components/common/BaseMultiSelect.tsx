import { useEffect, useMemo, useRef, useState } from 'react'

type Option = {
  label: string
  value: string
}

type BaseMultiSelectProps = {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  required?: boolean
}

export default function BaseMultiSelect({
  options,
  value,
  onChange,
  placeholder = '선택',
  required = false,
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
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className="base-multi-select" ref={wrapRef}>
      {required && (
        <input
          type="text"
          value={value.length > 0 ? 'selected' : ''}
          readOnly
          required
          tabIndex={-1}
          aria-hidden="true"
          className="base-multi-select-hidden-input"
        />
      )}

      <button
        type="button"
        className={`base-select-trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{selectedLabel}</span>
        <span className={`base-select-arrow ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <div className="base-multi-select-dropdown">
          {options.length === 0 ? (
            <div className="base-multi-select-empty">선택 가능한 항목이 없습니다</div>
          ) : (
            options.map((option) => {
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
            })
          )}
        </div>
      )}
    </div>
  )
}
