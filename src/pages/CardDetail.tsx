import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCards } from '@hooks/useCards'
import TabMenu from '@components/TabMenu'
import EstimateTab from '@components/tabs/EstimateTab'
import InjuryTab from '@components/tabs/InjuryTab'
import FaultTab from '@components/tabs/FaultTab'
import { BaseButton } from '@components/common'

const TAB_COMPONENTS = [EstimateTab, InjuryTab, FaultTab]

function CardDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: cards, isLoading, isError } = useCards()
  const [activeTab, setActiveTab] = useState(0)

  const card = cards?.find((c) => c.id === Number(id))
  const TabContent = TAB_COMPONENTS[activeTab]

  return (
    <div className="page">
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
          <TabContent card={card} />
        </main>
      )}

      {!isLoading && !isError && !card && <p className="status-msg">카드를 찾을 수 없습니다.</p>}
    </div>
  )
}

export default CardDetail
