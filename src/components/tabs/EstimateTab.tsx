// AI 자동차 손해사정 > 견적 산정 탭
import { useState } from 'react'
import type { Card } from '@api/cards'
import TabHeader from './TabHeader'

import {
  BaseButton,
  BaseRadio,
  BaseSelect,
  BaseInput,
  BaseSection,
  BaseFormField,
} from '@components/common'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

// [DATA] 라디오 버튼 옵션
const radioOptions = [
  { label: '자사차량(A)', value: 'a' },
  { label: '타사차량(B)', value: 'b' },
  { label: '국산', value: 'domestic' },
  { label: '외산', value: 'imported' },
]

const radioOptions2 = [
  { label: '경미', value: 'a' },
  { label: '중간', value: 'b' },
  { label: '심각', value: 'c' },
  { label: '전손 추정', value: 'd' },
]

const selectOptions = [
  { label: '현대', value: 'hyundai' },
  { label: '기아', value: 'kia' },
  { label: '벤츠', value: 'benz' },
]

function EstimateTab({ card, selectedValue, onSelectChange }: Props) {
  const [radioVal, setRadioVal] = useState('')
  const [radioVal2, setRadioVal2] = useState('')
  const [selectVal, setselectVal] = useState('')
  const [inputVal, setInputVal] = useState('')

  // [FUNC] 라디오 버튼 변경 핸들러
  const handleRadioChange = (value: string) => {
    setRadioVal(value)
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
          { value: 'case4', label: 'Case 4: sample case 4' },
        ]}
        selectedValue={selectedValue}
        onSelectChange={onSelectChange}
        onLoad={() => {}}
        onReset={() => onSelectChange('')}
        onViewSituation={() => {}}
      />
      {/* TODO: 견적 산정 기능 구현 */}

      <BaseSection className="mt-20" title="차량 정보">
        {/* 차량 타입 */}
        <BaseRadio options={radioOptions} value={radioVal} onChange={handleRadioChange} />

        {/* 2열 */}
        <div className="grid-2">
          <BaseFormField label="제조사" required>
            <BaseSelect
              options={selectOptions}
              value={selectVal}
              onChange={setselectVal}
              placeholder="선택"
            />
          </BaseFormField>

          <BaseFormField label="모델" required>
            <BaseSelect options={[]} value={''} onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="연식">
            <BaseSelect options={[]} value={''} onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="주행거리 (km)">
            <BaseInput
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="입력"
            />
          </BaseFormField>
        </div>
      </BaseSection>

      <BaseSection className="mt-20" title="사고 사진">
        <p>사고사진</p>
      </BaseSection>
      <BaseSection className="mt-20" title="파손 부위">
        <BaseFormField className="w100">
          <p>라디오 리스트... 추가필요</p>
          <BaseSelect options={[]} value={''} onChange={() => {}} placeholder="선택" />
        </BaseFormField>
      </BaseSection>

      <BaseSection className="mt-20" title="차량 정보">
        <BaseRadio options={radioOptions2} value={radioVal2} onChange={setRadioVal2} />
      </BaseSection>

      <BaseButton className="mt-10 w100" onClick={() => console.log('클릭')}>
        견적 산정 실행
      </BaseButton>
    </section>
  )
}

export default EstimateTab
