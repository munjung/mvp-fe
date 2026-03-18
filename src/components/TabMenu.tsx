import { BaseTab } from '@components/common'

const TABS = ['견적 산정', '대인피해', '과실 산정', '처리 방법']

interface Props {
  active: number
  onChange: (index: number) => void
}

export default function TabMenu({ active, onChange }: Props) {
  return <BaseTab tabs={TABS} active={active} onChange={onChange} />
}
