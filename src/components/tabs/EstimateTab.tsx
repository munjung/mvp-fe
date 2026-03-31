// AI 자동차 손해사정 > 견적 산정 탭
import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import type { Card } from '@api/cards'
import { useBrands, useDamages, useChats } from '@/hooks/useEstimate'
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
  BaseChat,
} from '@components/common'

interface Props {
  card: Card
  selectedValue: string
  onSelectChange: (value: string) => void
}

type SelectOption = {
  label: string
  value: string
}

type RadioOption = {
  label: string
  value: string
}

type BrandItem = {
  id: number | string
  name: string
}

type DamagePart = {
  id: number | string
  name: string
}

type DamageItem = {
  category: string
  part?: DamagePart[]
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

const selectCaseOptions: SelectOption[] = [
  { label: 'Case 1: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case1' },
  { label: 'Case 2: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case2' },
  { label: 'Case 3: 교차로 골목길 충돌 - 그랜저 vs BMW 7 시리즈', value: 'case3' },
]

function EstimateTab({ selectedValue, onSelectChange }: Props) {
  const [vehicleType, setVehicleType] = useState('')
  const [damageLevel, setDamageLevel] = useState('')
  const [brandValue, setBrandValue] = useState('')
  const [modelValue, setModelValue] = useState('')
  const [yearValue, setYearValue] = useState('')
  const [mileageValue, setMileageValue] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [frontChips, setFrontChips] = useState<string[]>([])
  const [backChips, setBackChips] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const { data: brands } = useBrands()
  const { data: damages } = useDamages()

  const brandOptions = useMemo<SelectOption[]>(() => {
    const brandList = (brands?.data as BrandItem[] | undefined) ?? []

    return brandList.map((brand) => ({
      label: brand.name,
      value: String(brand.id),
    }))
  }, [brands?.data])

  const { frontOptions, backOptions } = useMemo(() => {
    const damageList = (damages?.data as DamageItem[] | undefined) ?? []

    const result = {
      frontOptions: [] as SelectOption[],
      backOptions: [] as SelectOption[],
    }

    damageList.forEach((damage) => {
      const mappedParts: SelectOption[] =
        damage.part?.map((part) => ({
          label: part.name,
          value: String(part.id),
        })) ?? []

      if (damage.category === '전면부') {
        result.frontOptions = mappedParts
      }

      if (damage.category === '후면부') {
        result.backOptions = mappedParts
      }
    })

    return result
  }, [damages?.data])

  const handleMileageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMileageValue(e.target.value)
  }

  const selectedCase = selectCaseOptions.find((option) => option.value === selectedValue)
  const selectedDamageText = [...frontChips, ...backChips].join(', ')

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
  const [chatStart, setChatStart] = useState(false)

  const { data: returnChatData } = useChats(chatParams, chatStart)

  const handleChangeBrand = (value: string) => {
    setBrandValue(value)
    setSearchForm((prev) => ({
      ...prev,
      brandCd: value,
    }))
  }

  const handleSearch = () => {
    console.log('견적생성 실행 버튼', searchForm)
    setChatParams({
      ...searchForm,
      damageCds: [...searchForm.damageCds],
    })
    setChatStart(true)
  }

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

      <div className="estimate-layout mt-20">
        <div className="estimate-layout__left">
          <BaseSection title="차량 정보">
            <BaseRadio options={vehicleTypeOptions} value={vehicleType} onChange={setVehicleType} />

            <div className="grid-2">
              <BaseFormField label="제조사" required>
                <BaseSelect
                  options={brandOptions}
                  value={brandValue}
                  onChange={handleChangeBrand}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="모델" required>
                <BaseSelect
                  options={[]}
                  value={modelValue}
                  onChange={setModelValue}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="연식">
                <BaseSelect
                  options={[]}
                  value={yearValue}
                  onChange={setYearValue}
                  placeholder="선택"
                />
              </BaseFormField>

              <BaseFormField label="주행거리 (km)">
                <BaseInput value={mileageValue} onChange={handleMileageChange} placeholder="입력" />
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

              <BaseMultiSelectChip
                label="전면부"
                options={frontOptions}
                value={frontChips}
                onChange={setFrontChips}
              />

              <BaseMultiSelectChip
                label="후면부"
                options={backOptions}
                value={backChips}
                onChange={setBackChips}
              />
            </BaseFormField>
          </BaseSection>

          <BaseSection className="mt-20" title="파손 정도">
            <BaseRadio options={damageLevelOptions} value={damageLevel} onChange={setDamageLevel} />
          </BaseSection>

          <BaseButton className="mt-10 w100" onClick={handleSearch}>
            견적 산정 실행
          </BaseButton>
        </div>

        <div className="estimate-layout__right">
          {!chatStart && (
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
          {chatStart && (
            <div>
              <BaseSection title="예상 견적">
                <p></p>
              </BaseSection>

              <BaseSection className="mt-20" title="세부 산출">
                <p></p>
              </BaseSection>

              <BaseSection className="mt-20" title="AI 분석">
                <BaseChat width="500" start={chatStart} chatData={returnChatData}></BaseChat>
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
        title={selectedCase?.label ?? '사고 상황'}
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
