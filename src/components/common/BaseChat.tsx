import { useEffect, useState } from 'react'

type ChatBlock = {
  id: number
  html: string
}

interface VisibleChatBlock extends ChatBlock {
  renderedHtml: string
}

interface BaseChatProps {
  width?: number | string
  chatData?: ChatBlock[] | null
  typingSpeed?: number
  blockDelay?: number
}

export default function BaseChat({
  width = 300,
  chatData = [],
  typingSpeed = 20,
  blockDelay = 300,
}: BaseChatProps) {
  const [visibleBlocks, setVisibleBlocks] = useState<VisibleChatBlock[]>([])

  const isLoading = chatData && visibleBlocks && visibleBlocks.length < chatData.length

  useEffect(() => {
    let cancelled = false

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms)
      })

    // HTML 태그는 통째로, 일반 텍스트만 1글자씩 처리
    const getNextChunk = (html: string, cursor: number) => {
      if (cursor >= html.length) return { chunk: '', nextCursor: cursor }

      if (html[cursor] === '<') {
        const end = html.indexOf('>', cursor)
        if (end !== -1) {
          return {
            chunk: html.slice(cursor, end + 1),
            nextCursor: end + 1,
          }
        }
      }

      return {
        chunk: html[cursor],
        nextCursor: cursor + 1,
      }
    }

    const runTyping = async () => {
      setVisibleBlocks([])

      if (!chatData) return
      for (const block of chatData) {
        if (cancelled) return

        // 새 말풍선 먼저 추가
        setVisibleBlocks((prev) => [
          ...prev,
          {
            ...block,
            renderedHtml: '',
          },
        ])

        let cursor = 0

        while (cursor < block.html.length) {
          if (cancelled) return

          const { chunk, nextCursor } = getNextChunk(block.html, cursor)
          cursor = nextCursor

          // 마지막 block만 찾아서 내용 누적
          setVisibleBlocks((prev) =>
            prev.map((item) =>
              item.id === block.id ? { ...item, renderedHtml: item.renderedHtml + chunk } : item,
            ),
          )

          // 태그는 즉시, 텍스트만 타이핑 속도 적용
          if (!chunk.startsWith('<')) {
            await wait(typingSpeed)
          }
        }

        await wait(blockDelay)
      }
    }

    runTyping()

    return () => {
      cancelled = true
    }
  }, [chatData, typingSpeed, blockDelay])

  return (
    <div className="base-chat" style={{ width: typeof width === 'number' ? `${width}px` : width }}>
      <div className="base-chat__list">
        {visibleBlocks.map((block) => (
          <div key={block.id} className="base-chat__item">
            <div className="base-chat__bubble">
              {/* html 문자열을 그대로 렌더링하므로 sanitize 필요 */}
              <div dangerouslySetInnerHTML={{ __html: block.renderedHtml }} />
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
