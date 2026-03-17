import { useNavigate } from 'react-router-dom'

export default function ClaimsAgentMVP() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <button className="card-btn card-btn--back" onClick={() => navigate('/mvps')}>
        ← 포털로
      </button>

      <h1>AI 자동차 손해사정 Agent</h1>
      <p>여기에 기존 ClaimsAgentMVP 내용을 넣으면 됩니다.</p>
    </div>
  )
}
