import type { CSSProperties, ReactNode } from 'react'
import BaseButton from './BaseButton'

interface BasePopupProps {
  show: boolean
  title?: string
  children: ReactNode

  width?: string | number
  height?: string | number

  confirmText?: string
  cancelText?: string

  onConfirm?: () => void
  onCancel?: () => void
  onClose?: () => void

  showConfirm?: boolean
  showCancel?: boolean
  showCloseButton?: boolean
}

export default function BasePopup({
  show,
  title,
  children,
  width,
  height,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
  showConfirm = true,
  showCancel = false,
  showCloseButton = false,
}: BasePopupProps) {
  if (!show) return null

  const popupStyle: CSSProperties = {
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
  }

  const hasFooter = showConfirm || showCancel

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" style={popupStyle} onClick={(e) => e.stopPropagation()}>

        {/* 헤더: 타이틀 + 선택적 X 버튼 */}
        {(title || showCloseButton) && (
          <div className="popup__header">
            <span>{title}</span>
            {showCloseButton && (
              <button className="popup__close" onClick={onClose} aria-label="닫기">✕</button>
            )}
          </div>
        )}

        <div className="popup__body">{children}</div>

        {/* 버튼이 하나도 없으면 footer 자체를 렌더링하지 않음 */}
        {hasFooter && (
          <div className="popup__footer">
            {showCancel && (
              <BaseButton onClick={onCancel}>{cancelText}</BaseButton>
            )}
            {showConfirm && (
              <BaseButton className="primary" onClick={onConfirm}>
                {confirmText}
              </BaseButton>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
