// AI 자동차 손해사정 > 견적 산정 탭
import { useState } from 'react'
import type { Card } from '@api/cards'
import { BaseRadio } from '@components/common'
import TabHeader from './TabHeader'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

// [DATA] 라디오 버튼 옵션
const radioOptions = [
  { label: '전체', value: '' },
  { label: '국산', value: '국산차' },
  { label: '외산', value: '외산차' },
]

function EstimateTab({ card, selectedValue, onSelectChange }: Props) {
   const [radio, setRadio] = useState('국산차')

  // [FUNC] 라디오 버튼 변경 핸들러
  const handleRadioChange = (value: string) => {
    setRadio(value)
  }

  return (
    <section>
      <TabHeader
        title="견적 산정"
        tabType="estimate"
        selectOptions={[
          { value: 'default', label: 'Use Case를 선택하세요' },
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
      {/* TODO: 견적 산정 기능 구현 */}

      <BaseRadio options={radioOptions} value={radio} onChange={handleRadioChange} />
    </section>
  )
}

export default EstimateTab
