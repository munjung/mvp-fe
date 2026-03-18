import { BaseTabHeader, type BadgeMeta } from '@components/common'

const BADGES: BadgeMeta[] = [
  { key: 'estimate', label: '견적 산정', color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
  { key: 'injury',   label: '대인피해', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  { key: 'fault',    label: '과실 산정', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { key: 'process',  label: '처리 방법', color: '#aa3bff', bg: 'rgba(170,59,255,0.1)' },
]

interface SelectOption {
  value: string
  label: string
}

interface Props {
  title: string
  tabType: 'estimate' | 'injury' | 'fault' | 'process'
  selectOptions?: SelectOption[]
  selectedValue?: string
  onSelectChange?: (value: string) => void
  onLoad?: () => void
  onReset?: () => void
  onViewSituation?: () => void
}

export default function TabHeader({ tabType, ...rest }: Props) {
  return <BaseTabHeader activeKey={tabType} badges={BADGES} {...rest} />
}
