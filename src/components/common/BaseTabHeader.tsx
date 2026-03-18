import { useState, useEffect } from 'react'
import BaseSelect from './BaseSelect'

export interface BadgeMeta {
  key: string
  label: string
  color: string
  bg: string
}

interface SelectOption {
  value: string
  label: string
}

interface Props {
  title: string
  activeKey: string
  badges?: BadgeMeta[]
  selectOptions?: SelectOption[]
  selectedValue?: string
  onSelectChange?: (value: string) => void
  onLoad?: () => void
  onReset?: () => void
  onViewSituation?: () => void
}

export default function BaseTabHeader({
  title,
  activeKey,
  badges = [],
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

  // value='' 인 항목은 placeholder로 분리
  const placeholder = selectOptions.find(o => o.value === '')?.label ?? '선택'
  const filteredOptions = selectOptions.filter(o => o.value !== '')

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
      {filteredOptions.length > 0 && (
        <BaseSelect
          options={filteredOptions}
          value={selectedValue}
          onChange={val => onSelectChange?.(val)}
          placeholder={placeholder}
        />
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
        {badges.map(badge => {
          const active = badge.key === activeKey
          return (
            <span
              key={badge.key}
              className={`tab-badge${active ? ' tab-badge--active' : ''}`}
              style={active ? { color: badge.color, background: badge.bg, border: `1px solid ${badge.color}40` } : undefined}
            >
              {badge.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
