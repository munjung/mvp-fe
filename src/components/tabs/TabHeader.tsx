import { BaseTabHeader, type BadgeMeta } from '@components/common'
import type { SelectOption } from '@/types/common'

interface Props {
  title: string
  tabType: string // 'estimate' | 'injury' | 'fault' | 'process'
  badgeList: BadgeMeta[]
  selectOptions?: SelectOption[]
  selectedValue?: string
  onSelectChange?: (value: string) => void
  onLoad?: () => void
  onReset?: () => void
  onViewSituation?: () => void
}

export default function TabHeader({ tabType, badgeList, ...rest }: Props) {
  return <BaseTabHeader activeKey={tabType} badges={badgeList} {...rest} />
}
