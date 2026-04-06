// AI 자동차 손해사정 > 견적 산정 탭
import { useEffect, useMemo, useState } from 'react'
import type { Card } from '@api/cards'
import { useBrands, useModels, useDamages } from '@/hooks/useEstimate'
import { useRuleEngine } from '@/hooks/useRuleEngine'
import type { UseCaseParam, ChatBlock } from '@/types/case'
import type { DamageCategory } from '@/types/damage'
import { useChats } from '@/hooks/useCards'
import { alert } from '@/lib/dialog'
import { isEmpty } from '@/utils/common'

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
  selectedValue: UseCaseParam // usecaseParam
  onSelectChange: (value: UseCaseParam) => void // usecaseParam update
}

type RadioOption = {
  label: string
  value: string
}

type FormState = {
  vehicleType: string
  damageDegree: string
  brandValue: number
  modelValue: number
  yearValue: string
  mileageValue: string
}

const vehicleTypeOptions: RadioOption[] = [
  { label: '자사차량(A)', value: 'a' },
  { label: '타사차량(B)', value: 'b' },
  { label: '국산', value: 'domestic' },
  { label: '외산', value: 'imported' },
]

const damageDegreeOptions: RadioOption[] = [
  { label: '경미', value: '경미' },
  { label: '중간', value: '중간' },
  { label: '심각', value: '심각' },
  { label: '전손 추정', value: '전손 추정' },
]

function EstimateTab({ selectedValue, onSelectChange }: Props) {
  // useState 공통 상태 선언
  const [form, setForm] = useState<FormState>({
    vehicleType: '', //  차량정보
    brandValue: selectedValue?.ownVehicle?.brand?.id ?? 0, //   제조사
    modelValue: selectedValue?.ownVehicle?.model?.id ?? 0, //   모델
    yearValue: '', //    연식
    mileageValue: '', // 주행거리
    damageDegree: selectedValue?.ownVehicle?.damageDegree ?? '', //  파손정도
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
  const { modelOptions, refetch } = useModels(selectedValue?.ownVehicle?.brand?.id ?? 0)

  const handleChipChange = (category: string) => (values: string[]) => {
    setSelectedChips((prev) => ({ ...prev, [category]: values }))
  }

  useEffect(() => {
    if (selectedValue?.ownVehicle) {
      // 1. 제조사 > 모델 목록 조회
      if (selectedValue.ownVehicle?.brand?.id) {
        refetch()
      }

      // 2. 파손 부위 세팅
      selectedValue?.ownVehicle?.damageParts?.map((damage: DamageCategory) => {
        if (damage?.part && damage?.part?.length > 0) {
          const parts = damage.part.map((item) => String(item.id))
          handleChipChange(damage.category)(parts)
        }
      })

      // 3. 나머지 Form 세팅
      setForm({
        vehicleType: 'a',
        brandValue: selectedValue?.ownVehicle?.brand?.id ?? 0,
        modelValue: selectedValue?.ownVehicle?.model?.id ?? 0,
        yearValue: '',
        mileageValue: '',
        damageDegree: selectedValue?.ownVehicle?.damageDegree,
      })
    } else {
      setForm({
        vehicleType: '',
        brandValue: 0,
        modelValue: 0,
        yearValue: '',
        mileageValue: '',
        damageDegree: '',
      })
      setSelectedChips({})
    }
  }, [selectedValue])

  useEffect(() => {
    // console.log('form change ::', form)
  }, [form])

  const selectedDamageText = useMemo(() => {
    return Object.entries(selectedChips).flatMap(([category, values]) =>
      values.map((v) => damageOptions[category]?.find((o) => o.value === v)?.label ?? v),
    )
    // .join(', ')
  }, [selectedChips, damageOptions])

  const { ruleResults, ruleLoading, runRules } = useRuleEngine()

  // -----------------------
  //  AI 분석
  // -----------------------

  const [chatLoading, setChatLoading] = useState(false)
  const [aiEstimate, setAiEstimate] = useState<ChatBlock[] | null>(null)
  const [aiCalculation, setAiCalculation] = useState<ChatBlock[] | null>(null)
  const [aiAnalyze, setAiAnalyze] = useState<ChatBlock[] | null>(null)

  const { mutate, isPending } = useChats() // 임시 AI API

  // AI분석 동작용
  const startChat = () => {
    console.log(brandOptions[form.brandValue].label)
    console.log(modelOptions, form.modelValue)
    console.log(modelOptions[form.modelValue])
    setAiEstimate([
      {
        id: 0,
        html: `
      <p>제조사 : ${brandOptions[form.brandValue].label ?? ''}</p><br />
      <p>모델 : ${modelOptions[form.modelValue]?.label ?? ''} </p><br />
      `,
      },
    ])
    setAiCalculation([{ id: 0, html: `<p>123</p>` }])

    const params = {
      ...selectedValue,
      ...form,
    }

    mutate(params, {
      onSuccess: (data) => {
        setAiAnalyze(data)
      },
    })
    setChatLoading(true)
  }

  // 견적생성 실행 버튼
  const handleSearch = () => {
    console.log(form)
    if (
      isEmpty(form.brandValue) ||
      form.brandValue == 0 ||
      isEmpty(form.modelValue) ||
      form.modelValue == 0
    ) {
      alert('차량정보를 입력해주세요.')
      return
    }
    if (isEmpty(form.damageDegree)) {
      alert('파손정도를 입력해주세요.')
      return
    }
    startChat()
    runRules()

    // 임시 사용 처리, TODO: usecaseParam에 update
    onSelectChange({
      ...selectedValue,
    })
  }

  // 온톨로지 추론 결과
  const aiRuleResult = useMemo(() => {
    return ruleResults.map((r, i) => {
      const mod =
        r.severity === 'error' || r.severity === 'critical'
          ? 'error'
          : r.severity === 'warn' || r.severity === 'warning'
            ? 'warn'
            : 'info'
      const html = `
        <div class="rule-result rule-result--${mod}">
          <div class="rule-result__badges">
            <span class="rule-result__badge rule-result__badge--${mod}">${r.flag}</span>
            <span class="rule-result__badge rule-result__badge--${mod}">${r.severity}</span>
          </div>
          <div class="rule-result__msg">${r.msg}</div>
          <div class="rule-result__clause">📌${r.clause}</div>
        </div>
        `
      return {
        id: i,
        html: html,
      }
    })
    // 데이터 정제
  }, [ruleResults])

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
                  onChange={(value) => handleChange('brandValue', value)}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="모델" required>
                <BaseSelect
                  options={modelOptions}
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
              <p>{selectedDamageText.join(', ')}</p>
              <p>{selectedDamageText.length}/20</p>
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
              options={damageDegreeOptions}
              value={form.damageDegree}
              onChange={(value) => handleChange('damageDegree', value)}
            />
          </BaseSection>

          <BaseButton className="mt-10 w100" onClick={handleSearch} disabled={isPending}>
            견적 산정 실행
          </BaseButton>
        </div>

        <div className="estimate-layout__right">
          {!chatLoading && (
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
          {chatLoading && (
            <div>
              <BaseSection title="예상 견적">
                <BaseChat width="500" chatData={aiEstimate}></BaseChat>
              </BaseSection>

              <BaseSection className="mt-20" title="세부 산출">
                <BaseChat width="500" chatData={aiCalculation}></BaseChat>
              </BaseSection>

              <BaseSection className="mt-20" title="AI 분석">
                <BaseChat width="500" chatData={aiAnalyze}></BaseChat>
              </BaseSection>

              <BaseSection className="mt-20" title="온톨로지 추론 결과">
                {ruleLoading && <p style={{ color: '#64748b', fontSize: 13 }}>추론 중...</p>}
                {!ruleLoading && <BaseChat width="500" chatData={aiRuleResult}></BaseChat>}
                {/* {!ruleLoading &&
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
                  })} */}
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
