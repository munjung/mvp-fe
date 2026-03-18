import { useState } from 'react'
import { BaseButton, BaseRadio, BaseSelect } from '@components/common'

const radioOptions = [
  { label: '전체', value: '' },
  { label: '국산', value: 'a' },
  { label: '외산', value: 'b' },
]

const selectOptions = [
  { label: '현대', value: 'a' },
  { label: '기아', value: 'b' },
  { label: '제네시스', value: 'c' },
]

export default function SamplePage() {
  const [status, setStatus] = useState('')
  const [city, setCity] = useState('')

  return (
    <div className="page">
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <BaseButton onClick={() => console.log('클릭')}>확인</BaseButton>

        <BaseRadio options={radioOptions} value={status} onChange={setStatus} />

        <BaseSelect options={selectOptions} value={city} onChange={setCity} placeholder="선택" />
      </div>
    </div>
  )
}
