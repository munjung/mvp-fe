import { useEffect, useRef, useState } from 'react'

type Option = {
  label: string
  value: string
}

type BaseMultiSelectChipProps = {
  label: string
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
}

export default function BaseMultiSelectChip({
  label,
  options,
  value,
  onChange,
}: BaseMultiSelectChipProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const selectedCount = value.length

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

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className="base-multi-chip" ref={wrapRef}>
      <button
        type="button"
        className={`base-multi-chip-trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="base-multi-chip-trigger-left">
          <span className="base-multi-chip-trigger-text">{label}</span>
          {selectedCount > 0 && <span className="base-multi-chip-badge">{selectedCount}</span>}
        </span>
        <span className={`base-multi-chip-arrow ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <div className="base-multi-chip-panel">
          <div className="base-multi-chip-list" role="listbox" aria-multiselectable="true">
            {options.length === 0 ? (
              <div className="base-multi-chip-empty">선택 가능한 항목이 없습니다</div>
            ) : (
              options.map((option) => {
                const checked = value.includes(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`base-multi-chip-item ${checked ? 'is-selected' : ''}`}
                    onClick={() => handleToggle(option.value)}
                    role="option"
                    aria-selected={checked}
                  >
                    {checked && <span className="base-multi-chip-check">✓</span>}
                    <span>{option.label}</span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
