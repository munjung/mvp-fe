import { useCallback, useState } from 'react'
import { useDropzone, type Accept } from 'react-dropzone'
import BaseButton from './BaseButton'

interface BaseFileUploadProps {
  value: File[]
  onChange: (files: File[]) => void
  multiple?: boolean
  accept?: Accept
  maxSize?: number
  disabled?: boolean
  placeholder?: string
}

const DEFAULT_ACCEPT: Accept = {
  'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
  'application/pdf': ['.pdf'],
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024

export default function BaseFileUpload({
  value,
  onChange,
  multiple = true,
  accept = DEFAULT_ACCEPT,
  maxSize = DEFAULT_MAX_SIZE,
  disabled = false,
  placeholder = '파일을 선택하거나 드래그하세요.',
}: BaseFileUploadProps) {
  const [error, setError] = useState('')

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return

      const validFiles = acceptedFiles.filter((file) => file.size > 0)

      if (validFiles.length !== acceptedFiles.length) {
        setError('빈 파일은 업로드할 수 없습니다.')
      } else {
        setError('')
      }

      if (validFiles.length === 0) return

      if (!multiple) {
        const nextFile = validFiles[0]

        const isDuplicate =
          value.length > 0 &&
          value.some(
            (file) =>
              file.name === nextFile.name &&
              file.size === nextFile.size &&
              file.lastModified === nextFile.lastModified,
          )

        if (isDuplicate) {
          setError('동일한 파일은 다시 추가할 수 없습니다.')
          return
        }

        onChange([nextFile])
        setError('')
        return
      }

      const mergedFiles = [...value]

      validFiles.forEach((newFile) => {
        const isDuplicate = mergedFiles.some(
          (file) =>
            file.name === newFile.name &&
            file.size === newFile.size &&
            file.lastModified === newFile.lastModified,
        )

        if (!isDuplicate) {
          mergedFiles.push(newFile)
        }
      })

      const addedCount = mergedFiles.length - value.length

      if (addedCount === 0) {
        setError('동일한 파일은 다시 추가할 수 없습니다.')
        return
      }

      onChange(mergedFiles)
      setError('')
    },
    [disabled, multiple, onChange, value],
  )

  const handleRemove = (removeIndex: number) => {
    if (disabled) return
    onChange(value.filter((_, index) => index !== removeIndex))
    setError('')
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: handleDrop,
    multiple,
    accept,
    maxSize,
    disabled,
  })

  const rejectionMessage =
    fileRejections.length > 0
      ? `파일 형식 또는 용량 제한을 확인해주세요. (최대 ${Math.floor(maxSize / 1024 / 1024)}MB)`
      : ''

  return (
    <div className={`base-file-upload ${disabled ? 'is-disabled' : ''}`}>
      <div
        {...getRootProps({
          className: `base-file-upload__dropzone ${isDragActive ? 'is-drag-active' : ''}`,
        })}
      >
        <input {...getInputProps()} />
        <p className="base-file-upload__placeholder">{placeholder}</p>
        <p className="base-file-upload__guide">
          PDF, JPG, JPEG, PNG, WEBP / 최대 {Math.floor(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {(error || rejectionMessage) && (
        <p className="base-file-upload__error">{error || rejectionMessage}</p>
      )}

      {value.length > 0 && (
        <ul className="base-file-upload__list">
          {value.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              className="base-file-upload__item"
            >
              <span className="base-file-upload__name">{file.name}</span>

              <BaseButton type="button" disabled={disabled} onClick={() => handleRemove(index)}>
                삭제
              </BaseButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
