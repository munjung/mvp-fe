import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCards } from '@hooks/useCards'
import TabMenu from '@components/TabMenu'
import TabHeader from '@components/tabs/TabHeader'
import EstimateTab from '@components/tabs/EstimateTab'
import InjuryTab from '@components/tabs/InjuryTab'
import FaultTab from '@components/tabs/FaultTab'
import { BaseButton, BasePopup, BaseSection } from '@components/common'
import ProcessTab from '@components/tabs/ProcessTab'
import { useCases } from '@/hooks/useCards'
import { type BadgeMeta } from '@components/common'

import type { ParamObject } from '@api/analyze'

const BADGES: BadgeMeta[] = [
  { key: 'estimate', label: '견적 산정', color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
  { key: 'injury', label: '대인피해', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  { key: 'fault', label: '과실 산정', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { key: 'process', label: '처리 방법', color: '#aa3bff', bg: 'rgba(170,59,255,0.1)' },
]

const TAB_COMPONENTS = [EstimateTab, InjuryTab, FaultTab, ProcessTab]

type SelectOption = {
  label: string
  value: string
}

type CaseItem = {
  id: string
  name: string
}

function CardDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: cards, isLoading, isError } = useCards()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedValue, setSelectedValue] = useState<ParamObject>({
    id: '',
    name: '',
    obj1: '',
    brandCd: '',
    damageCds: [''],
  })

  useEffect(() => {
    console.log(selectedValue)
  }, [selectedValue])

  const [selectedCase, setSelectedCase] = useState<string>('')

  const [popupOpen, setPopupOpen] = useState(false)

  const card = cards?.find((c) => c.id === Number(id))
  const TabContent = TAB_COMPONENTS[activeTab]
  const TabData = BADGES[activeTab]

  const { data: cases } = useCases()

  // [FUNC] UseCase 목록 -> Select Option 변경
  const selectCaseOptions = useMemo<SelectOption[]>(() => {
    const caseList = (cases?.data as CaseItem[] | undefined) ?? []

    return caseList.map((c) => ({
      label: c.name,
      value: String(c.id),
    }))
  }, [cases?.data])

  // [FUNC] UseCase 변경
  const onSelectCaseChange = (value: string) => {
    console.log(value)
    setSelectedCase(value)
  }

  const onLoadCaseDetail = () => {
    console.log(selectedCase)
  }
  return (
    <div style={{ padding: '2% 8%' }}>
      <header className="page-header" style={{ textAlign: 'left' }}>
        <BaseButton style={{ marginBottom: 24 }} onClick={() => navigate(-1)}>
          ← 목록으로
        </BaseButton>
        {card && (
          <>
            <div className="card-tags">
              {card.tags.map((tag) => (
                <span key={tag} className="card-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1
              style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-h)', margin: '12px 0 0' }}
            >
              {card.title}
            </h1>
            <p style={{ color: 'var(--text)', lineHeight: 1.7, marginTop: 15 }}>
              {card.description}
            </p>
          </>
        )}
      </header>

      {isLoading && <p className="status-msg">불러오는 중...</p>}
      {isError && <p className="status-msg error">데이터를 불러오지 못했습니다.</p>}

      {card && (
        <main>
          <TabMenu active={activeTab} onChange={setActiveTab} />
          <TabHeader
            title={TabData.label}
            tabType={TabData.key}
            badgeList={BADGES}
            selectOptions={selectCaseOptions}
            selectedValue={selectedCase}
            onSelectChange={onSelectCaseChange}
            onLoad={() => onLoadCaseDetail}
            onReset={() => setSelectedCase}
            onViewSituation={() => setPopupOpen(true)}
          />
          <TabContent card={card} selectedValue={selectedValue} onSelectChange={setSelectedValue} />
        </main>
      )}

      {!isLoading && !isError && !card && <p className="status-msg">카드를 찾을 수 없습니다.</p>}
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
    </div>
  )
}

export default CardDetail
