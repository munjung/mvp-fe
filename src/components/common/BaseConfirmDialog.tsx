import * as AlertDialog from '@radix-ui/react-alert-dialog'
import BaseButton from './BaseButton'

interface BaseConfirmDialogProps {
  open: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function BaseConfirmDialog({
  open,
  title = '알림',
  description = '',
  confirmText = '확인',
  cancelText = '취소',
  showCancel = true,
  onConfirm,
  onCancel,
}: BaseConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dialog-overlay" />

        <AlertDialog.Content className="dialog-content">
          <AlertDialog.Title className="dialog-title">{title}</AlertDialog.Title>

          {description && (
            <AlertDialog.Description className="dialog-description">
              {description}
            </AlertDialog.Description>
          )}

          <div className="dialog-footer">
            {showCancel && (
              <AlertDialog.Cancel asChild>
                <BaseButton type="button" onClick={onCancel}>
                  {cancelText}
                </BaseButton>
              </AlertDialog.Cancel>
            )}

            <AlertDialog.Action asChild>
              <BaseButton type="button" onClick={onConfirm}>
                {confirmText}
              </BaseButton>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
