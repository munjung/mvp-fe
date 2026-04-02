// AI 자동차 손해사정 > 견적 산정 탭
import { useMemo, useState } from 'react'
import type { Card } from '@api/cards'
import type { ParamObject } from '@api/analyze'
import { useBrands, useDamages, useChats } from '@/hooks/useEstimate'
import { useRuleEngine } from '@/hooks/useRuleEngine'
// import TabHeader from './TabHeader'

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
  BaseChat,
} from '@components/common'

interface Props {
  card: Card
  selectedValue: ParamObject
  onSelectChange: (value: ParamObject) => void
}

type RadioOption = {
  label: string
  value: string
}

type FormState = {
  vehicleType: string
  damageLevel: string
  brandValue: string
  modelValue: string
  yearValue: string
  mileageValue: string
}

const vehicleTypeOptions: RadioOption[] = [
  { label: '자사차량(A)', value: 'a' },
  { label: '타사차량(B)', value: 'b' },
  { label: '국산', value: 'domestic' },
  { label: '외산', value: 'imported' },
]

const damageLevelOptions: RadioOption[] = [
  { label: '경미', value: 'a' },
  { label: '중간', value: 'b' },
  { label: '심각', value: 'c' },
  { label: '전손 추정', value: 'd' },
]

function EstimateTab({ selectedValue, onSelectChange }: Props) {
  // useState 공통 상태 선언
  const [form, setForm] = useState<FormState>({
    vehicleType: '',
    damageLevel: '',
    brandValue: '',
    modelValue: '',
    yearValue: '',
    mileageValue: '',
  })

  // useState 공통 변경 함수
  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedChips, setSelectedChips] = useState<Record<string, string[]>>({})
  const [files, setFiles] = useState<File[]>([])

  const { brandOptions } = useBrands()
  const { damageOptions } = useDamages()

  const handleChipChange = (category: string) => (values: string[]) => {
    setSelectedChips((prev) => ({ ...prev, [category]: values }))
  }

  const selectedDamageText = useMemo(() => {
    return Object.entries(selectedChips)
      .flatMap(([category, values]) =>
        values.map((v) => damageOptions[category]?.find((o) => o.value === v)?.label ?? v),
      )
      .join(', ')
  }, [selectedChips, damageOptions])

  const { ruleResults, ruleLoading, runRules } = useRuleEngine()

  // -----------------------
  //  AI 분석
  // -----------------------
  type ChatParams = {
    brandCd: string
    damageCds: string[]
  }

  const [searchForm, setSearchForm] = useState<ChatParams>({
    brandCd: '',
    damageCds: [],
  })

  // AI분석 동작용
  const [chatParams, setChatParams] = useState<ChatParams | null>(null)
  const { data: returnChatData, isLoading: chatLoading } = useChats(chatParams)
  // const [chatStart, setChatStart] = useState(false)
  // const { data: returnChatData } = useChats(chatParams, chatStart)

  const handleChangeBrand = (value: string) => {
    handleChange('brandValue', value)
    setSearchForm((prev) => ({
      ...prev,
      brandCd: value,
    }))

    onSelectChange({
      ...selectedValue,
      brandCd: value,
    })
  }

  const startChat = () => {
    setChatParams({
      ...searchForm,
      damageCds: [...searchForm.damageCds],
    })
    // setChatStart(true)
  }

  const handleSearch = () => {
    console.log('견적생성 실행 버튼', searchForm)
    startChat()
    runRules()
  }

  return (
    <section>
      <div className="estimate-layout mt-20">
        <div className="estimate-layout__left">
          <BaseSection title="차량 정보">
            <BaseRadio
              options={vehicleTypeOptions}
              value={form.vehicleType}
              onChange={(value) => handleChange('vehicleType', value)}
            />

            <div className="grid-2">
              <BaseFormField label="제조사" required>
                <BaseSelect
                  options={brandOptions}
                  value={form.brandValue}
                  onChange={handleChangeBrand}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="모델" required>
                <BaseSelect
                  options={[]}
                  value={form.modelValue}
                  onChange={(value) => handleChange('modelValue', value)}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="연식">
                <BaseSelect
                  options={[]}
                  value={form.yearValue}
                  onChange={(value) => handleChange('yearValue', value)}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="주행거리 (km)">
                <BaseInput
                  value={form.mileageValue}
                  onChange={(e) => handleChange('mileageValue', e.target.value)}
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
              <p>{selectedDamageText}</p>

              {Object.keys(damageOptions).map((category) => (
                <BaseMultiSelectChip
                  key={category}
                  label={category}
                  options={damageOptions[category]}
                  value={selectedChips[category] ?? []}
                  onChange={handleChipChange(category)}
                />
              ))}
            </BaseFormField>
          </BaseSection>

          <BaseSection className="mt-20" title="파손 정도">
            <BaseRadio
              options={damageLevelOptions}
              value={form.damageLevel}
              onChange={(value) => handleChange('damageLevel', value)}
            />
          </BaseSection>

          <BaseButton className="mt-10 w100" onClick={handleSearch}>
            견적 산정 실행
          </BaseButton>
        </div>

        <div className="estimate-layout__right">
          {!chatParams && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '100px',
              }}
            >
              차량과 파손 부위 선택 후 실행하세요
            </div>
          )}
          {chatParams && (
            <div>
              <BaseSection title="예상 견적">
                <p></p>
              </BaseSection>

              <BaseSection className="mt-20" title="세부 산출">
                <p></p>
              </BaseSection>

              <BaseSection className="mt-20" title="AI 분석">
                <BaseChat width="500" loading={chatLoading} chatData={returnChatData} ></BaseChat>
              </BaseSection>

              <BaseSection className="mt-20" title="온톨로지 추론 결과">
                {ruleLoading && <p style={{ color: '#64748b', fontSize: 13 }}>추론 중...</p>}
                {!ruleLoading &&
                  ruleResults.map((r, i) => {
                    const mod =
                      r.severity === 'error' || r.severity === 'critical'
                        ? 'error'
                        : r.severity === 'warn' || r.severity === 'warning'
                          ? 'warn'
                          : 'info'
                    return (
                      <div key={i} className={`rule-result rule-result--${mod}`}>
                        <div className="rule-result__badges">
                          <span className={`rule-result__badge rule-result__badge--${mod}`}>
                            {r.flag}
                          </span>
                          <span className={`rule-result__badge rule-result__badge--${mod}`}>
                            {r.severity}
                          </span>
                        </div>
                        <div className="rule-result__msg">{r.msg}</div>
                        <div className="rule-result__clause">📌{r.clause}</div>
                      </div>
                    )
                  })}
              </BaseSection>

              <BaseSection className="mt-20" title="견적 산정 완료">
                <p></p>
              </BaseSection>
            </div>
          )}
        </div>
      </div>

      <BasePopup
        show={popupOpen}
        title={'사고 상황'}
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
