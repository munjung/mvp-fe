// AI 자동차 손해사정 > 처리 방법 탭
import { useState } from 'react'
import type { Card } from '@api/cards'
import type { UseCaseParam } from '@/types/case'

import { BaseSection, BaseButton, BaseTextarea, BaseRadio } from '@components/common'

interface Props {
  card: Card
  selectedValue: UseCaseParam
  onSelectChange: (value: UseCaseParam) => void
}

const radioOptions = [
  { label: '520d 사이드 미러+범퍼 파손', value: 'a' },
  { label: 'GV80 전면 5부위 심각', value: 'b' },
  { label: '아반떼 후미 충돌', value: 'c' },
]

function ProcessTab({ selectedValue, onSelectChange }: Props) {
  const [radioVal, setRadioVal] = useState('')

  // [FUNC] 라디오 버튼 변경 핸들러
  const handleRadioChange = (value: string) => {
    setRadioVal(value)
    onSelectChange({ ...selectedValue })
  }

  return (
    <section>
      {/* TODO: 처리방법 기능 구현 */}

      <BaseButton>사고건 불러오기</BaseButton>
      <BaseSection className="mt-20" title="사고건 내용 입력">
        <BaseTextarea></BaseTextarea>
        <BaseRadio options={radioOptions} value={radioVal} onChange={handleRadioChange} />
      </BaseSection>

      <BaseButton className="mt-10 w100" onClick={() => console.log('클릭')}>
        접수 내용 분석
      </BaseButton>
    </section>
  )
}

export default ProcessTab
