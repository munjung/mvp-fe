import { useState, useMemo, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TabMenu from '@components/TabMenu'
import TabHeader from '@components/tabs/TabHeader'
import EstimateTab from '@components/tabs/EstimateTab'
import InjuryTab from '@components/tabs/InjuryTab'
import FaultTab from '@components/tabs/FaultTab'
import { BaseButton, BasePopup, BaseSection } from '@components/common'
import ProcessTab from '@components/tabs/ProcessTab'
import { useCards, useCases, useCaseDetail } from '@/hooks/useCards'
import { type BadgeMeta } from '@/types/common'

import type { ParamObject } from '@/types/tab'

const BADGES: BadgeMeta[] = [
  { key: 'estimate', label: '견적 산정', color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
  { key: 'injury', label: '대인피해', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  { key: 'fault', label: '과실 산정', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { key: 'process', label: '처리 방법', color: '#aa3bff', bg: 'rgba(170,59,255,0.1)' },
]

const TAB_COMPONENTS = [EstimateTab, InjuryTab, FaultTab, ProcessTab]

function CardDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: cards, isLoading, isError } = useCards()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedValue, setSelectedValue] = useState<ParamObject>({})

  const [selectedCase, setSelectedCase] = useState<string>('')
  const [caseDetailId, setCaseDetailId] = useState<number | undefined>(undefined)
  const [popupOpen, setPopupOpen] = useState(false)

  const card = useMemo(() => {
    return cards?.find((c) => c.id === Number(id))
  }, [cards, id])
  const TabContent = TAB_COMPONENTS[activeTab] ?? EstimateTab
  const TabData = BADGES[activeTab] ?? BADGES[0]

  const { selectCaseOptions = [] } = useCases()
  const { data: caseDetail } = useCaseDetail(caseDetailId)

  // [FUNC] UseCase 변경
  const onSelectCaseChange = useCallback((value: string) => {
    console.log(value)
    setSelectedCase(value)
  }, [])

  const onLoadCaseDetail = useCallback(() => {
    setCaseDetailId(Number(selectedCase))
  }, [selectedCase])

  const closePopup = () => setPopupOpen(false)

  useEffect(() => {
    if (caseDetail) {
      setSelectedValue({
        id: selectedCase,
        name: '',
        obj1: '',
        brandCd: '',
        damageCds: [],
        ownVehicle: caseDetail.ownVehicle,
        otherVehicle: caseDetail.otherVehicle,
      })
    }
     console.log(selectedValue)
  }, [caseDetail, selectedCase])

  if (isLoading) return <p className="status-msg">불러오는 중...</p>
  if (isError) return <p className="status-msg error">데이터를 불러오지 못했습니다.</p>
  if (!card) return <p className="status-msg">카드를 찾을 수 없습니다.</p>
  return (
    <div style={{ padding: '2% 8%' }}>
      <header className="page-header" style={{ textAlign: 'left' }}>
        <BaseButton style={{ marginBottom: 24 }} onClick={() => navigate(-1)}>
          ← 목록으로
        </BaseButton>

        <div className="card-tags">
          {card.tags.map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-h)', margin: '12px 0 0' }}>
          {card.title}
        </h1>
        <p style={{ color: 'var(--text)', lineHeight: 1.7, marginTop: 15 }}>{card.description}</p>
      </header>

      <main>
        <TabMenu active={activeTab} onChange={setActiveTab} />
        <TabHeader
          title={TabData.label}
          tabType={TabData.key}
          badgeList={BADGES}
          selectOptions={selectCaseOptions}
          selectedValue={selectedCase}
          onSelectChange={onSelectCaseChange}
          onLoad={onLoadCaseDetail}
          onReset={() => setSelectedCase('')}
          onViewSituation={() => setPopupOpen(true)}
        />
        <TabContent
            card={card}
            selectedValue={selectedValue}
            onSelectChange={setSelectedValue}
            caseDetail={caseDetail}
          />
      </main>

      <BasePopup
        show={popupOpen}
        title={'사고 상황'}
        width="35%"
        height="70%"
        showCloseButton={true}
        showConfirm={false}
        showCancel={false}
        onCancel={closePopup}
        onConfirm={closePopup}
        onClose={closePopup}
      >
        <BaseSection className="mt-10">
          <p>🚗 사고 상황</p>
        </BaseSection>
      </BasePopup>
    </div>
  )
}

export default CardDetail
