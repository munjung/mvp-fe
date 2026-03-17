import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MVPS, THEMES } from '@/features/portal/portalData'

export default function PortalPage() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'dark' | 'light' | 'pro'>('dark')
  const t = THEMES[theme]

  const [requestModal, setRequestModal] = useState(false)
  const [reqDone, setReqDone] = useState(false)

  const [reqForm, setReqForm] = useState({
    name: '',
    team: '',
    email: '',
    category: '',
    title: '',
    desc: '',
    deadline: '',
  })

  const [requests, setRequests] = useState([
    {
      id: 1,
      title: 'AI방화벽',
      category: 'Security',
      desc: '내부 네트워크 이상 트래픽을 AI로 탐지하고 자동 차단하는 방화벽 대시보드',
      name: '편길동',
      team: 'Axbd',
      email: 'hgd@kt.com',
      date: '2026. 2. 26.',
      status: '접수',
    },
  ])

  const goToMvp = (id: string) => {
    navigate(`/mvps/${id}`)
  }

  const handleRequest = () => {
    if (
      !reqForm.name.trim() ||
      !reqForm.team.trim() ||
      !reqForm.email.trim() ||
      !reqForm.title.trim() ||
      !reqForm.desc.trim()
    ) {
      return
    }

    setRequests((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: reqForm.title,
        category: reqForm.category || '기타',
        desc: reqForm.desc,
        name: reqForm.name,
        team: reqForm.team,
        email: reqForm.email,
        date: new Date().toLocaleDateString('ko-KR'),
        status: '접수',
      },
    ])

    setReqDone(true)

    setTimeout(() => {
      setRequestModal(false)
      setReqDone(false)
      setReqForm({
        name: '',
        team: '',
        email: '',
        category: '',
        title: '',
        desc: '',
        deadline: '',
      })
    }, 2000)
  }

  const formReady =
    reqForm.name.trim() &&
    reqForm.team.trim() &&
    reqForm.email.trim() &&
    reqForm.title.trim() &&
    reqForm.desc.trim()

  return (
    <div
      className="portal-page"
      style={{
        width: '100%',
        minHeight: '100vh',
        fontFamily: "'Pretendard', -apple-system, 'Noto Sans KR', sans-serif",
        background: t.bg,
        color: t.text,
        position: 'relative',
        transition: 'background .4s, color .4s',
        ['--portal-text' as string]: t.text,
        ['--portal-input-bg' as string]: t.inputBg,
        ['--portal-input-border' as string]: t.inputBorder,
        ['--portal-placeholder' as string]: t.placeholder,
      }}
    >
      <header
        className="portal-header"
        style={{
          background: t.headerBg,
          borderBottom: `1px solid ${t.divider}`,
        }}
      >
        <div className="portal-header-inner">
          <div className="portal-logo-wrap">
            <div
              className="portal-logo"
              style={{
                background: `linear-gradient(135deg, ${t.accent}, ${theme === 'pro' ? '#6366f1' : '#059669'})`,
              }}
            >
              DMP
            </div>
          </div>

          <div className="portal-theme-group">
            {Object.values(THEMES).map((th) => (
              <button
                key={th.id}
                className="portal-theme-btn"
                onClick={() => setTheme(th.id)}
                style={{
                  background: theme === th.id ? t.accent : 'transparent',
                  color: theme === th.id ? '#fff' : t.muted,
                }}
              >
                {th.short}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="portal-hero">
        <h1>Deny MVP Portal</h1>
        <p>
          AX 사업개발팀이 만든 MVP를 직접 체험해보세요.
          <br />
          카드를 클릭하면 실제 작동하는 MVP를 바로 사용할 수 있습니다.
        </p>
      </section>

      <section className="portal-grid-wrap">
        <div className="portal-grid">
          {MVPS.map((mvp) => (
            <div
              key={mvp.id}
              className="portal-card"
              style={{
                background: mvp.gradient,
                border: `1px solid ${mvp.border}`,
              }}
              onClick={() => goToMvp(mvp.id)}
            >
              <div className="portal-card-top">
                <span>{mvp.category}</span>
                <span className="portal-card-status">{mvp.status}</span>
              </div>

              <div className="portal-card-icon">{mvp.icon}</div>
              <h2>{mvp.title}</h2>
              <p>{mvp.desc}</p>

              <div className="portal-card-tags">
                <div className="portal-card-tag-list">
                  {mvp.tags.map((tag) => (
                    <span key={tag} className="portal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portal-cta-wrap">
        <div
          className="portal-request-card"
          style={{
            border: `1px dashed ${t.reqCardBorder}`,
            background: t.reqCardBg,
          }}
          onClick={() => setRequestModal(true)}
        >
          <div className="portal-request-plus">+</div>
          <div className="portal-request-title">새로운 MVP 제작 의뢰</div>
          <div className="portal-request-desc">아이디어를 현실로 만들어보세요</div>
        </div>
      </section>

      {requestModal && (
        <div className="portal-modal-overlay" onClick={() => !reqDone && setRequestModal(false)}>
          <div
            className="portal-modal"
            style={{
              background: t.modalBg,
              border: `1px solid ${t.modalBorder}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {reqDone ? (
              <div className="portal-modal-done">
                <div>✅</div>
                <div>의뢰가 접수되었습니다!</div>
              </div>
            ) : (
              <>
                <h2>MVP 제작 의뢰</h2>

                <input
                  value={reqForm.name}
                  onChange={(e) => setReqForm({ ...reqForm, name: e.target.value })}
                  placeholder="이름"
                />
                <input
                  value={reqForm.team}
                  onChange={(e) => setReqForm({ ...reqForm, team: e.target.value })}
                  placeholder="소속 팀"
                />
                <input
                  value={reqForm.email}
                  onChange={(e) => setReqForm({ ...reqForm, email: e.target.value })}
                  placeholder="이메일"
                />
                <input
                  value={reqForm.title}
                  onChange={(e) => setReqForm({ ...reqForm, title: e.target.value })}
                  placeholder="MVP 제목"
                />
                <textarea
                  value={reqForm.desc}
                  onChange={(e) => setReqForm({ ...reqForm, desc: e.target.value })}
                  placeholder="상세 설명"
                  rows={5}
                />

                <button
                  className="portal-submit-btn"
                  disabled={!formReady}
                  onClick={handleRequest}
                  style={{
                    background: formReady ? t.accent : t.inputBg,
                    color: formReady ? '#fff' : t.muted,
                  }}
                >
                  의뢰 제출하기
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
