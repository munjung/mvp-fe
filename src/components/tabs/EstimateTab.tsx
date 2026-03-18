import type { Card } from '@api/cards'
import TabHeader from './TabHeader'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

function EstimateTab({ card, selectedValue, onSelectChange }: Props) {
  return (
    <section>
      <TabHeader
        title="견적 산정"
        tabType="estimate"
        selectOptions={[
          { value: '', label: 'Use Case를 선택하세요' },
          { value: 'case1', label: 'Case 1: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈' },
          { value: 'case2', label: 'Case 2: sample case 2' },
          { value: 'case3', label: 'Case 3: sample case 3' },
          { value: 'case4', label: 'Case 4: sample case 4' }
        ]}
        selectedValue={selectedValue}
        onSelectChange={onSelectChange}
        onLoad={() => {}}
        onReset={() => onSelectChange('')}
        onViewSituation={() => {}}
      />
      <p style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.description}</p>
      {/* TODO: 견적 산정 기능 구현 */}
    </section>
  )
}

export default EstimateTab
