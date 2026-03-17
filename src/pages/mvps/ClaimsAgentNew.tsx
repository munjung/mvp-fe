import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabMenu from '@components/TabMenu'
import EstimateTab from '@components/tabs/EstimateTab'
import InjuryTab from '@components/tabs/InjuryTab'
import FaultTab from '@components/tabs/FaultTab'

const TAB_COMPONENTS = [EstimateTab, InjuryTab, FaultTab]

const mockCard = {
  id: 1,
  title: 'AI 자동차 손해사정 Agent',
  description:
    '견적 산정 · 과실비율 분석 · 처리방법 제안까지 AI가 의사결정을 지원하는 자동차 손해사정 포탈',
  tags: ['AI Agent', '손해사정', 'AI진단'],
}

export default function ClaimsAgentMVP() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  const TabContent = TAB_COMPONENTS[activeTab]

  return (
    <div className="page">
      <header className="page-header page-header--left">
        <button className="card-btn card-btn--back" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>

        <div className="card-tags">
          {mockCard.tags.map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="detail-title">{mockCard.title}</h1>
        <p className="detail-desc">{mockCard.description}</p>
      </header>

      <main>
        <TabMenu active={activeTab} onChange={setActiveTab} />
        <TabContent card={mockCard} />
      </main>
    </div>
  )
}
