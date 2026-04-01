// AI 자동차 손해사정 > 대인 피해 탭
import type { Card } from '@api/cards'
import type { ParamObject } from '@api/analyze'

import { BaseSection, BaseTextarea, BaseButton } from '@components/common'

interface Props {
  card: Card
  selectedValue: ParamObject
  onSelectChange: (value: ParamObject) => void
}

function InjuryTab({ selectedValue, onSelectChange }: Props) {
  const onStartBtn = () => {
    console.log('대인분석실행 버튼')
    onSelectChange({ ...selectedValue })
  }
  return (
    <section>
      {/* TODO: 대인피해 기능 구현 */}
      <div className="estimate-layout mt-20">
        <div className="estimate-layout__left">
          <BaseSection className="mt-20" title="대인 접수 내용">
            <BaseTextarea placeholder="대인 접수 정보를 입력하세요... 예: 접수자 정보, 상해 내용, 진단서, 치료비, 위자료 등"></BaseTextarea>
          </BaseSection>
          <BaseButton className="mt-10 w100" onClick={onStartBtn}>
            대인 분석 실행
          </BaseButton>
        </div>

        <div className="estimate-layout__right">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
            }}
          >
            대인 접수 내용 입력 후 분석을 실행하세요
          </div>
        </div>
      </div>
    </section>
  )
}

export default InjuryTab
