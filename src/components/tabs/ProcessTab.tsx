import type { Card } from '@api/cards'
import TabHeader from './TabHeader'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

function ProcessTab({ card, selectedValue, onSelectChange }: Props) {
  return (
    <section>
      <TabHeader
        title="처리 방법"
        tabType="process"
        selectOptions={[
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
      {/* TODO: 처리방법 기능 구현 */}
    </section>
  )
}

export default ProcessTab
