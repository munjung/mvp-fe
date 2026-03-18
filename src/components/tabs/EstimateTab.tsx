// AI 자동차 손해사정 > 견적 산정 탭
import { useState } from 'react'
import type { Card } from '@api/cards'
import { BaseRadio } from '@components/common'

interface Props {
  card: Card
}

// [DATA] 라디오 버튼 옵션
const radioOptions = [
  { label: '전체', value: '' },
  { label: '국산', value: '국산차' },
  { label: '외산', value: '외산차' },
]

function EstimateTab({ card }: Props) {
  const [radio, setRadio] = useState('국산차')

  // [FUNC] 라디오 버튼 변경 핸들러
  const handleRadioChange = (value: string) => {
    setRadio(value)
  }

  return (
    <section>
      <h2 style={{ color: 'var(--text-h)', marginBottom: 12 }}>견적 산정</h2>
      <p style={{ color: 'var(--text)', lineHeight: 1.7 }}>{card.description}</p>
      {/* TODO: 견적 산정 기능 구현 */}

      <BaseRadio options={radioOptions} value={radio} onChange={handleRadioChange} />
    </section>
  )
}

export default EstimateTab
