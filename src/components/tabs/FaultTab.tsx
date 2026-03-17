import type { Card } from '@api/cards'

interface Props {
  card: Card
}

function FaultTab({ card }: Props) {
  return (
    <section>
      <h2 style={{ color: 'var(--text-h)', marginBottom: 12 }}>과실 산정</h2>
      <p style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.description}</p>
      {/* TODO: 과실 산정 기능 구현 */}
    </section>
  )
}

export default FaultTab
