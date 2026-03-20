import { useState } from 'react'
import type { Card } from '@api/cards'
import TabHeader from './TabHeader'

import {
  BaseButton,
  BaseRadio,
  BaseSelect,
  BaseSection,
  BaseFormField,
  BaseTextarea,
  BaseCheckbox,
} from '@components/common'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

// [DATA] 라디오 버튼 옵션
const radioOptions = [
  { label: '사고 전체 모습', value: 'a' },
  { label: '파손 부위 근접', value: 'b' },
  { label: '주변 도로 상황', value: 'c' },
  { label: '차량 위치/각도', value: 'c' },
  { label: '상대 번호판', value: 'c' },
]

const selectOptions = [
  { label: '현대', value: 'hyundai' },
  { label: '기아', value: 'kia' },
  { label: '벤츠', value: 'benz' },
]

function FaultTab({ selectedValue, onSelectChange }: Props) {
  const [radioVal, setRadioVal] = useState('')
  const [selectVal, setselectVal] = useState('')
  const [textVal, setTextVal] = useState('')
  const [checked, setChecked] = useState(false)

  // [FUNC] 라디오 버튼 변경 핸들러
  const handleRadioChange = (value: string) => {
    setRadioVal(value)
  }
  return (
    <section>
      <TabHeader
        title="과실 산정"
        tabType="fault"
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
      {/* TODO: 과실 산정 기능 구현 */}
      <div className="estimate-layout mt-20">
        {/* 좌측: 입력 폼 */}
        <div className="estimate-layout__left">
          <BaseSection title="사고 유형">
            <BaseFormField label="">
              <BaseSelect options={selectOptions} value={selectVal} onChange={setselectVal} />
            </BaseFormField>
          </BaseSection>

          <BaseSection className="mt-10" title="사고 현장 사진">
            <BaseRadio options={radioOptions} value={radioVal} onChange={handleRadioChange} />
          </BaseSection>

          <BaseSection className="mt-10" title="진술">
            <BaseFormField label="A차량(청구자)">
              <BaseTextarea
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="사고 당시 상황을 상세히 기술해주세요."
              />
            </BaseFormField>
            <BaseFormField label="B차량(상대방)">
              <BaseTextarea
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="상대방의 진술 내용을 기술해주세요."
              />
            </BaseFormField>
          </BaseSection>
          <BaseSection className="mt-10" title="증거자료">
            <BaseSection>
              <BaseCheckbox
                label="📹 블랙박스 영상"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </BaseSection>
            <BaseSection>
              <BaseCheckbox
                label="📄 경찰 보고서"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </BaseSection>
            <BaseSection>
              <BaseCheckbox
                label="📷 CCTV / 도로 카메라"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </BaseSection>
            <BaseSection>
              <BaseCheckbox
                label="👤 목격자 진술서"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </BaseSection>
          </BaseSection>
          <BaseButton className="mt-10 w100" onClick={() => console.log('클릭')}>
            견적 산정 실행
          </BaseButton>
        </div>
        {/* 우측: 결과 textarea */}
        <div className="estimate-layout__right">
          <p>사고 유형과 상황을 입력 후 실행하세요</p>
        </div>
      </div>
    </section>
  )
}

export default FaultTab
