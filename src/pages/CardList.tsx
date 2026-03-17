import '@assets/css/App.css'
import { useNavigate } from 'react-router-dom'
import { useCards } from '../hooks/useCards'

function Main() {
  const { data: cards, isLoading, isError } = useCards()
  const navigate = useNavigate()

  return (
    <div className="page">
      <header className="page-header">
        <h1>메인 화면</h1>
        <p>설명 텍스트를 이곳에 입력하세요.</p>
      </header>

      {isLoading && <p className="status-msg">불러오는 중...</p>}
      {isError && <p className="status-msg error">데이터를 불러오지 못했습니다.</p>}

      {cards && (
        <main className="card-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/cards/${card.id}`)}
            >
              <div className="card-thumbnail" />
              <div className="card-body">
                <div className="card-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="card-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-desc">{card.description}</p>
              </div>
              <div className="card-footer">
                <button className="card-btn" onClick={(e) => { e.stopPropagation(); navigate(`/cards/${card.id}`) }}>자세히 보기</button>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  )
}

export default Main
