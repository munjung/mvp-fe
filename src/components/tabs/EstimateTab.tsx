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
  BasePopup,
  BaseMultiSelectChip,
  BaseFileUpload,
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

const selectCaseOptions = [
  { label: 'Case 1: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case1' },
  { label: 'Case 2: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case2' },
  { label: 'Case 3: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case3' },
]

const multiSelectChipOptions1 = [
  { label: '프론트 범퍼(상)', value: '프론트 범퍼(상)' },
  { label: '프론트 범퍼(하부)', value: '프론트 범퍼(하부)' },
  { label: '본넷', value: '본넷' },
  { label: '프론트 그릴', value: '프론트 그릴' },
  { label: '라디에이터', value: '라디에이터' },
  { label: '인터쿨러', value: '인터쿨러' },
  { label: '좌 헤드라이트', value: '좌 헤드라이트' },
  { label: '우 헤드라이트', value: '우 헤드라이트' },
]

const multiSelectChipOptions2 = [
  { label: '프론트 범퍼(상)', value: '프론트 범퍼(상)' },
  { label: '프론트 범퍼(하부)', value: '프론트 범퍼(하부)' },
  { label: '본넷', value: '본넷' },
  { label: '프론트 그릴', value: '프론트 그릴' },
  { label: '라디에이터', value: '라디에이터' },
  { label: '인터쿨러', value: '인터쿨러' },
  { label: '좌 헤드라이트', value: '좌 헤드라이트' },
  { label: '우 헤드라이트', value: '우 헤드라이트 ' },
]

function EstimateTab({ selectedValue, onSelectChange }: Props) {
  const [radioVal, setRadioVal] = useState('')
  const [radioVal2, setRadioVal2] = useState('')
  const [selectVal, setselectVal] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [chips1, setChips1] = useState<string[]>([]) // 파손부위 전면부
  const [chips2, setChips2] = useState<string[]>([]) // 파손부위 후면부
  const [files, setFiles] = useState<File[]>([]) // 사고사진

  // [FUNC] 라디오 버튼 변경 핸들러
  const handleRadioChange = (value: string) => {
    setRadioVal(value)
  }

  const selectedCase = selectCaseOptions.find((option) => option.value === selectedValue)

  return (
    <section>
      <TabHeader
        title="견적 산정"
        tabType="estimate"
        selectOptions={selectCaseOptions}
        selectedValue={selectedValue}
        onSelectChange={onSelectChange}
        onLoad={() => {}}
        onReset={() => onSelectChange('')}
        onViewSituation={() => setPopupOpen(true)}
      />
      {/* TODO: 견적 산정 기능 구현 */}

      <div className="estimate-layout mt-20">
        {/* 좌측: 입력 폼 */}
        <div className="estimate-layout__left">
          <BaseSection title="차량 정보">
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
            <BaseFileUpload
              value={files}
              onChange={setFiles}
              multiple
              maxSize={5 * 1024 * 1024}
              accept={{
                'image/*': ['.jpg', '.jpeg', '.png'],
                'application/pdf': ['.pdf'],
              }}
              placeholder="이미지 또는 PDF 파일을 업로드하세요."
            />
          </BaseSection>

          <BaseSection className="mt-20" title="파손 부위">
            <BaseFormField className="w100">
              <p>
                {chips1.join(', ')}
                {chips2.join(', ')}
              </p>
              <BaseMultiSelectChip
                label="전면부"
                options={multiSelectChipOptions1}
                value={chips1}
                onChange={setChips1}
              />
              <BaseMultiSelectChip
                label="후면부"
                options={multiSelectChipOptions2}
                value={chips2}
                onChange={setChips2}
              />
            </BaseFormField>
          </BaseSection>

          <BaseSection className="mt-20" title="차량 정보">
            <BaseRadio options={radioOptions2} value={radioVal2} onChange={setRadioVal2} />
          </BaseSection>

          <BaseButton className="mt-10 w100" onClick={() => console.log('클릭')}>
            견적 산정 실행
          </BaseButton>
        </div>

        {/* 우측: 결과 textarea */}
        <div className="estimate-layout__right">
          <BaseSection title="예상 견적">
            <p></p>
          </BaseSection>
          <BaseSection className="mt-20" title="세부 산출">
            <p></p>
          </BaseSection>
          <BaseSection className="mt-20" title="AI 분석">
            <p></p>
          </BaseSection>
          <BaseSection className="mt-20" title="견적 산정 완료">
            <p></p>
          </BaseSection>
        </div>
      </div>

      <BasePopup
        show={popupOpen}
        title={selectedCase?.label}
        width="35%"
        height="70%"
        showCloseButton={true}
        showConfirm={false}
        showCancel={false}
        onCancel={() => setPopupOpen(false)}
        onConfirm={() => setPopupOpen(false)}
        onClose={() => setPopupOpen(false)}
      >
        <BaseSection className="mt-10">
          <p>🚗 사고 상황</p>
        </BaseSection>
      </BasePopup>
    </section>
  )
}

export default EstimateTab
