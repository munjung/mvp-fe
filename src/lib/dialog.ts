type DialogType = 'alert' | 'confirm'

type OpenDialogOptions = {
  type: DialogType
  title?: string
  description: string
  confirmText?: string
  cancelText?: string
}

type ConfirmResolver = (value: boolean) => void
type AlertResolver = () => void

let confirmResolver: ConfirmResolver | null = null
let alertResolver: AlertResolver | null = null

function openDialog(options: OpenDialogOptions) {
  window.dispatchEvent(
    new CustomEvent('OPEN_DIALOG', {
      detail: options,
    }),
  )
}

export function confirm(
  description: string,
  options?: {
    title?: string
    confirmText?: string
    cancelText?: string
  },
): Promise<boolean> {
  return new Promise((resolve) => {
    confirmResolver = resolve

    openDialog({
      type: 'confirm',
      title: options?.title ?? '확인',
      description,
      confirmText: options?.confirmText ?? '확인',
      cancelText: options?.cancelText ?? '취소',
    })
  })
}

export function alert(
  description: string,
  options?: {
    title?: string
    confirmText?: string
  },
): Promise<void> {
  return new Promise((resolve) => {
    alertResolver = resolve

    openDialog({
      type: 'alert',
      title: options?.title ?? '알림',
      description,
      confirmText: options?.confirmText ?? '확인',
    })
  })
}

export function resolveConfirm(value: boolean) {
  if (!confirmResolver) return
  confirmResolver(value)
  confirmResolver = null
}

export function resolveAlert() {
  if (!alertResolver) return
  alertResolver()
  alertResolver = null
}
