import type { Card } from '@api/cards'

interface Props {
  card: Card
}

function ProcessTab({ card }: Props) {
  return (
    <section>
      <h2 style={{ color: 'var(--text-h)', marginBottom: 12 }}>처리 방법</h2>
      <p style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.description}</p>
      {/* TODO: 처리방법 기능 구현 */}
    </section>
  )
}

export default ProcessTab
