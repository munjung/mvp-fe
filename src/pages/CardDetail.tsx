import { useParams, useNavigate } from 'react-router-dom'
import { useCards } from '../hooks/useCards'
import '../assets/css/App.css'

function CardDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: cards, isLoading, isError } = useCards()

  const card = cards?.find((c) => c.id === Number(id))

  return (
    <div className="page">
      <header className="page-header" style={{ textAlign: 'left' }}>
        <button className="card-btn" onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
          ← 목록으로
        </button>
      </header>

      {isLoading && <p className="status-msg">불러오는 중...</p>}
      {isError && <p className="status-msg error">데이터를 불러오지 못했습니다.</p>}

      {card && (
        <main>
          <div className="card-thumbnail" style={{ borderRadius: 12, marginBottom: 32 }} />
          <div className="card-tags">
            {card.tags.map((tag) => (
              <span key={tag} className="card-tag">{tag}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-h)', margin: '12px 0 16px' }}>
            {card.title}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.7 }}>{card.description}</p>
        </main>
      )}

      {!isLoading && !isError && !card && (
        <p className="status-msg">카드를 찾을 수 없습니다.</p>
      )}
    </div>
  )
}

export default CardDetail
