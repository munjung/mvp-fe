import { useState, useEffect } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface Props {
  title: string
  tabType: 'estimate' | 'injury' | 'fault' | 'process'
  selectOptions?: SelectOption[]
  selectedValue?: string
  onSelectChange?: (value: string) => void
  onLoad?: () => void
  onReset?: () => void
  onViewSituation?: () => void
}

const TAB_META: Record<Props['tabType'], { label: string; color: string; bg: string }> = {
  estimate: { label: '견적 산정', color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
  injury:   { label: '대인피해', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  fault:    { label: '과실 산정', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  process:  { label: '처리 방법', color: '#aa3bff', bg: 'rgba(170,59,255,0.1)' },
}

function TabHeader({
  title,
  tabType,
  selectOptions = [],
  selectedValue = '',
  onSelectChange,
  onLoad,
  onReset,
  onViewSituation,
}: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [selectedValue])

  const hasValue = selectedValue !== ''

  function handleLoad() {
    setLoaded(true)
    onLoad?.()
  }

  function handleReset() {
    setLoaded(false)
    onReset?.()
  }

  return (
    <div className="tab-header">
      {/* 탭 이름 */}
      <span className="tab-header__title">• {title} |</span>

      {/* 셀렉트박스 */}
      {selectOptions.length > 0 && (
        <select
          className="tab-header__select"
          value={selectedValue}
          onChange={e => onSelectChange?.(e.target.value)}
        >
          {selectOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* 불러오기 버튼 */}
      {!loaded && (
        <button
          className={`base-button${!hasValue ? ' tab-header__btn--disabled' : ''}`}
          onClick={handleLoad}
          disabled={!hasValue}
        >
          불러오기
        </button>
      )}

      {/* 초기화 / 상황 보기 버튼 */}
      {loaded && (
        <>
          <button className="base-button" onClick={handleReset}>
            초기화
          </button>
          <button className="base-button" onClick={onViewSituation}>
            상황 보기
          </button>
        </>
      )}

      {/* 우측 탭 구분 배지 */}
      <div className="tab-header__badges">
        {(Object.keys(TAB_META) as Props['tabType'][]).map(type => {
          const m = TAB_META[type]
          const active = type === tabType
          return (
            <span
              key={type}
              className={`tab-badge${active ? ' tab-badge--active' : ''}`}
              style={active ? { color: m.color, background: m.bg, border: `1px solid ${m.color}40` } : undefined}
            >
              {m.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TabHeader
