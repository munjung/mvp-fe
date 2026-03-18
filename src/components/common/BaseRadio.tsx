import * as RadioGroup from '@radix-ui/react-radio-group'

interface RadioOption {
  label: string
  value: string
}

interface BaseRadioProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  name?: string
}

export default function BaseRadio({
  options,
  value,
  onChange,
  className = '',
  name = 'base-radio',
}: BaseRadioProps) {
  return (
    <RadioGroup.Root
      className={`base-radio-group ${className}`.trim()}
      value={value}
      onValueChange={onChange}
      name={name}
    >
      {options.map((option) => (
        <RadioGroup.Item key={option.value} value={option.value} className="base-radio-item">
          {option.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
