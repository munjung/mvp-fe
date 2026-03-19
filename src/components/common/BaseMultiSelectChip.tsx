import { useEffect, useMemo, useRef, useState } from 'react'

type Option = {
  label: string
  value: string
}

type BaseMultiSelectChipProps = {
  label: string
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export default function BaseMultiSelectChip({
  label,
  options,
  value,
  onChange,
  placeholder = '선택',
}: BaseMultiSelectChipProps) {
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

  const selectedCount = value.length

  const triggerText = useMemo(() => {
    // if (selectedCount === 0) return placeholder
    return label
  }, [label, placeholder, selectedCount])

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue))
      return
    }

    onChange([...value, optionValue])
  }

  return (
    <div className="base-multi-chip" ref={wrapRef}>
      <button
        type="button"
        className={`base-multi-chip-trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="base-multi-chip-trigger-left">
          <span className="base-multi-chip-trigger-text">{triggerText}</span>
          {selectedCount > 0 && <span className="base-multi-chip-badge">{selectedCount}</span>}
        </span>
        <span className={`base-multi-chip-arrow ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <div className="base-multi-chip-panel">
          <div className="base-multi-chip-list">
            {options.map((option) => {
              const checked = value.includes(option.value)

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`base-multi-chip-item ${checked ? 'is-selected' : ''}`}
                  onClick={() => handleToggle(option.value)}
                >
                  {checked && <span className="base-multi-chip-check">✓</span>}
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
