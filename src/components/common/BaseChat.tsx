import { useEffect, useRef, useState } from 'react'

type ChatBlock = {
  id: number
  html: string
}

interface BaseChatProps {
  width?: number | string
  loading?: boolean
  chatData?: ChatBlock[]
}

export default function BaseChat({
  width = 300,
  loading = false,
  chatData = [],
}: BaseChatProps) {
  const [visibleBlocks, setVisibleBlocks] = useState<ChatBlock[]>([])
  const chatRef = useRef<HTMLDivElement | null>(null)

  const isLoading = visibleBlocks.length < chatData.length

  useEffect(() => {
    setVisibleBlocks([])

    if (chatData.length === 0) return

    const timers = chatData.map((block, index) =>
      window.setTimeout(() => {
        setVisibleBlocks((prev) => [...prev, block])
      }, index * 700),
    )

    return () => timers.forEach(clearTimeout)
  }, [chatData])

  return (
    <div
      className="base-chat"
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    >
      <div ref={chatRef} className="base-chat__list">
        {visibleBlocks.map((block) => (
          <div key={block.id} className="base-chat__item">
            <div className="base-chat__bubble">
              {/* TODO: sanitize 필요 */}
              <div dangerouslySetInnerHTML={{ __html: block.html }} />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="base-chat__item">
            <div className="base-chat__bubble base-chat__bubble--loading">
              분석 생성 중...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}