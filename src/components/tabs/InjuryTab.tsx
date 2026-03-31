// AI 자동차 손해사정 > 대인 피해 탭
import type { Card } from '@api/cards'
import TabHeader from './TabHeader'

import { BaseSection, BaseTextarea, BaseButton } from '@components/common'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

function InjuryTab({ selectedValue, onSelectChange }: Props) {
  return (
    <section>
      <TabHeader
        title="대인피해"
        tabType="injury"
        selectOptions={[
          { value: 'case1', label: 'Case 1: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈' },
          { value: 'case2', label: 'Case 2: sample case 2' },
          { value: 'case3', label: 'Case 3: sample case 3' },
          { value: 'case4', label: 'Case 4: sample case 4' },
        ]}
        selectedValue={selectedValue}
        onSelectChange={onSelectChange}
        onLoad={() => {}}
        onReset={() => onSelectChange('')}
        onViewSituation={() => {}}
      />
      {/* TODO: 대인피해 기능 구현 */}
      <BaseSection className="mt-20" title="대인 접수 내용">
        <BaseTextarea></BaseTextarea>
      </BaseSection>
      <BaseButton className="mt-10 w100" onClick={() => console.log('클릭')}>
        대인 분석 실행
      </BaseButton>
    </section>
  )
}

export default InjuryTab
