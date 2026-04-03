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
import type { UseCaseParam } from '@/types/case'
import { type BadgeMeta } from '@/types/common'

const BADGES: BadgeMeta[] = [
  { key: 'estimate', label: '견적 산정', color: '#2563eb', bg: 'rgba(127, 133, 147, 0.1)' },
  { key: 'injury', label: '대인피해', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  { key: 'fault', label: '과실 산정', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  { key: 'process', label: '처리 방법', color: '#aa3bff', bg: 'rgba(170,59,255,0.1)' },
]

const TAB_COMPONENTS = [EstimateTab, InjuryTab, FaultTab, ProcessTab]

function CardDetail() {
  const navigate = useNavigate()

  // card
  const { id } = useParams<{ id: string }>()
  const { data: cards, isLoading, isError } = useCards()
  const card = useMemo(() => {
    return cards?.find((c) => c.id === Number(id))
  }, [cards, id])

  // tab
  const [activeTab, setActiveTab] = useState(0)
  const TabContent = TAB_COMPONENTS[activeTab] ?? EstimateTab
  const TabData = BADGES[activeTab] ?? BADGES[0]
  // usecase
  const [selectedCase, setSelectedCase] = useState<string>('') // usecase id
  const [selectedValue, setSelectedValue] = useState<UseCaseParam>({}) // usecase Detail > usecase Param

  const { selectCaseOptions = [] } = useCases()
  const { data: caseDetail, refetch } = useCaseDetail(Number(selectedCase), false)
  // popup
  const [popupOpen, setPopupOpen] = useState(false)

  // [FUNC] UseCase 변경
  const onSelectCaseChange = useCallback((value: string) => {
    console.log(value)
    setSelectedCase(value)
  }, [])

  // [FUNC] UseCase 불러오기 버튼
  const onLoadCaseDetail = () => {
    // 버튼 클릭 시 상세조회 API 호출 (자동 호출 방지, 수동 실행)
    refetch().then(() => {
      const ownVehicle = caseDetail?.ownVehicle?.[0]
      const otherVehicle = caseDetail?.otherVehicle?.[0]
      setSelectedValue({
        ...selectedValue,
        ownVehicle: ownVehicle,
        otherVehicle: otherVehicle,
      })
    })
  }

  // [FUNC] 상황보기 팝업 닫기
  const closePopup = () => setPopupOpen(false)

  useEffect(() => {
    console.log('selectedValue change :: ', selectedValue)
  }, [selectedValue])

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
        {/* 탭 */}
        <TabMenu active={activeTab} onChange={setActiveTab} />
        {/* useCase */}
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
        {/* 탭 화면 */}
        <TabContent card={card} selectedValue={selectedValue} onSelectChange={setSelectedValue} />
      </main>
      {/* 상황보기 팝업 */}
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
