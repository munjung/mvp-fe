import { useNavigate } from 'react-router-dom'

export default function StockPilot() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <button className="card-btn card-btn--back" onClick={() => navigate('/mvps')}>
        ← 포털로
      </button>
      <h1>StockPilot MVP</h1>
    </div>
  )
}
