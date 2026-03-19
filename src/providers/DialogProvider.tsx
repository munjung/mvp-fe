import { useEffect, useState } from 'react'
import BaseConfirmDialog from '@/components/common/BaseConfirmDialog'
import { resolveAlert, resolveConfirm } from '@/lib/dialog'

type DialogType = 'alert' | 'confirm'

interface DialogState {
  open: boolean
  type: DialogType
  title: string
  description: string
  confirmText: string
  cancelText: string
}

const INITIAL_STATE: DialogState = {
  open: false,
  type: 'alert',
  title: '알림',
  description: '',
  confirmText: '확인',
  cancelText: '취소',
}

export default function DialogProvider() {
  const [dialog, setDialog] = useState<DialogState>(INITIAL_STATE)

  useEffect(() => {
    const handleOpenDialog = (event: Event) => {
      const customEvent = event as CustomEvent<{
        type: DialogType
        title?: string
        description: string
        confirmText?: string
        cancelText?: string
      }>

      const detail = customEvent.detail

      setDialog({
        open: true,
        type: detail.type,
        title: detail.title ?? (detail.type === 'confirm' ? '확인' : '알림'),
        description: detail.description,
        confirmText: detail.confirmText ?? '확인',
        cancelText: detail.cancelText ?? '취소',
      })
    }

    window.addEventListener('OPEN_DIALOG', handleOpenDialog)

    return () => {
      window.removeEventListener('OPEN_DIALOG', handleOpenDialog)
    }
  }, [])

  const handleClose = () => {
    setDialog((prev) => ({ ...prev, open: false }))
  }

  const handleConfirm = () => {
    if (dialog.type === 'confirm') {
      resolveConfirm(true)
    } else {
      resolveAlert()
    }
    handleClose()
  }

  const handleCancel = () => {
    if (dialog.type === 'confirm') {
      resolveConfirm(false)
    } else {
      resolveAlert()
    }
    handleClose()
  }

  return (
    <BaseConfirmDialog
      open={dialog.open}
      title={dialog.title}
      description={dialog.description}
      confirmText={dialog.confirmText}
      cancelText={dialog.cancelText}
      showCancel={dialog.type === 'confirm'}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  )
}
