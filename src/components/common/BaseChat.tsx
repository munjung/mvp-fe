import { useEffect, useRef, useState } from 'react'

interface BaseChatProps {
  width?: number | string
  start: boolean
  chatData?: ChatBlock[]
}

type ChatBlock = {
  id: number
  html: string
}

export default function BaseChat({
  width = '300',
  start = false, //  로딩 상태 (true면 "분석 생성 중..." 메시지 노출)
  chatData = [{ id: 0, html: '' }], //  채팅 데이터 (HTML 문자열 배열)
}: BaseChatProps) {
  const [visibleBlocks, setVisibleBlocks] = useState<ChatBlock[]>([])
  const hasStarted = useRef(false)

  const isLoading = start && visibleBlocks.length < chatData.length

  useEffect(() => {
    if (hasStarted.current) return

    if (chatData.length === 0) return
    hasStarted.current = true

    // 블록을 순서대로 하나씩 노출
    const timers = chatData.map((block, index) =>
      window.setTimeout(() => {
        setVisibleBlocks((prev) => [...prev, block])
      }, index * 700),
    )

    // unmount 시 타이머 정리
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [isLoading, chatData])

  useEffect(() => {
    if (visibleBlocks.length === 0) return

    // 새 블록이 추가될 때마다 아래로 스크롤
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }, [visibleBlocks])

  return (
    <div className="base-chat" style={{ width: `${width}px` }}>
      <div className="base-chat__list">
        {visibleBlocks.map((block, index) => (
          <div key={`${block.id}-${index}`} className="base-chat__item">
            <div className="base-chat__bubble">
              {/* 외부 HTML이면 sanitize 필요 */}
              <div dangerouslySetInnerHTML={{ __html: block.html }} />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="base-chat__item">
            <div className="base-chat__bubble base-chat__bubble--loading">분석 생성 중...</div>
          </div>
        )}
      </div>
    </div>
  )
}
