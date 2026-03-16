import type { Card } from '../../api/cards'

interface Props {
  card: Card
}

function InjuryTab({ card }: Props) {
  return (
    <section>
      <h2 style={{ color: 'var(--text-h)', marginBottom: 12 }}>대인피해</h2>
      <p style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.description}</p>
      {/* TODO: 대인피해 기능 구현 */}
    </section>
  )
}

export default InjuryTab
