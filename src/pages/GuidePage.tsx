import { useState } from 'react'
import {
  BaseButton,
  BaseRadio,
  BaseSelect,
  BaseInput,
  BaseSection,
  BaseTextarea,
  BaseFormField,
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

export default function GuidePage() {
  const [radioVal, setRadioVal] = useState('')
  const [selectVal, setselectVal] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [textVal, setTextVal] = useState('')

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
