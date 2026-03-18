import * as Select from '@radix-ui/react-select'

interface SelectOption {
  label: string
  value: string
}

interface BaseSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function BaseSelect({
  options,
  value,
  onChange,
  placeholder = '선택',
  className = '',
}: BaseSelectProps) {
  const selectedOption = options.find((option) => option.value === value)

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={`base-select-trigger ${className}`.trim()}>
        <Select.Value placeholder={placeholder}>{selectedOption?.label}</Select.Value>
        <Select.Icon>▼</Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="base-select-content" position="popper">
          <Select.Viewport className="base-select-viewport">
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className="base-select-item">
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
