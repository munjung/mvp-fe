import { useState } from 'react'
import {
  BaseButton,
  BaseRadio,
  BaseSelect,
  BaseInput,
  BaseSection,
  BaseTextarea,
  BaseFormField,
  BaseTab,
  BaseTabHeader
} from '@components/common'

const radioOptions = [
  { label: '전체', value: '' },
  { label: '국산', value: 'domestic' },
  { label: '외산', value: 'imported' },
]

const selectOptions = [
  { label: '현대', value: 'hyundai' },
  { label: '기아', value: 'kia' },
  { label: '벤츠', value: 'benz' },
]

const tabs = ['견적 산정', '대인 피해', '과실 산정', '처리 방법', '기타']

const tabHeaderOptions = [
  { label: 'Case 1: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case1' },
  { label: 'Case 2: sample case 2', value: 'case2' },
  { label: 'Case 2: sample case 3', value: 'case3' },
]

const badgesOptions = [
  { key: 'estimate', label: '견적 산정', color: '#4a3c98', bg: '#f0edff' },
  { key: 'damage', label: '대인 피해', color: '#c92a2a', bg: '#fff5f5' },
  { key: 'fault', label: '과실 산정', color: '#2b8a3e', bg: '#e6f4ea' }
]


export default function GuidePage() {
  const [radioVal, setRadioVal] = useState('')
  const [selectVal, setselectVal] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [textVal, setTextVal] = useState('')
  const [tabVal, setTabVal] = useState(0)
  const [tabHeaderVal, setTabHeaderVal] = useState('')

  return (
    <div className="page">
      {/* ================= 기본 컴포넌트 ================= */}
      <BaseSection title="기본 컴포넌트">
        <div className="grid-1">
          <div>
            <p>* 버튼</p>
            <BaseButton onClick={() => console.log('클릭')}>확인</BaseButton>
          </div>

          <div>
            <p>* 라디오</p>
            <BaseRadio options={radioOptions} value={radioVal} onChange={setRadioVal} />
          </div>

          <div>
            <p>* 셀렉트</p>
            <BaseSelect
              options={selectOptions}
              value={selectVal}
              onChange={setselectVal}
              placeholder="선택"
            />
          </div>
          
          <div>
            <p>* 탭</p>
            <BaseTab tabs={tabs} active={tabVal} onChange={(index) => setTabVal(index)}></BaseTab>
          </div>

          <div>
            <p>* 탭 헤더</p>
            <BaseTabHeader
              title="견적 산정"
              activeKey="damage"
              badges={badgesOptions}
              selectOptions={tabHeaderOptions}
              selectedValue={tabHeaderVal}
              onSelectChange={setTabHeaderVal}
              onLoad={() => console.log('불러오기')}
              onReset={() => setTabHeaderVal('')}
              onViewSituation={() => console.log('상황 보기')}
            />
          </div>
        </div>
      </BaseSection>

      {/* ================= 폼 예시 ================= */}
      <BaseSection className="mt-20" title="차량 정보">
        {/* 차량 타입 */}
        <BaseRadio options={radioOptions} value={radioVal} onChange={setRadioVal} />

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

        {/* 3열 */}
        <div className="grid-3">
          <BaseFormField label="입력1">
            <BaseSelect
              options={selectOptions}
              value={selectVal}
              onChange={setselectVal}
              placeholder="선택"
            />
          </BaseFormField>

          <BaseFormField label="입력2">
            <BaseSelect options={[]} value="" onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="입력3">
            <BaseSelect options={[]} value="" onChange={() => {}} placeholder="선택" />
          </BaseFormField>

          <BaseFormField label="입력4">
            <BaseInput value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          </BaseFormField>

          <BaseFormField label="입력5">
            <BaseInput value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          </BaseFormField>
        </div>

        <BaseFormField label="내용">
          <BaseTextarea
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </BaseFormField>
      </BaseSection>
    </div>
  )
}
