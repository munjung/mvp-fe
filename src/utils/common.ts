// utils/common.ts

export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  // string
  if (typeof value === 'string') {
    return value.trim() === ''
  }
  // array
  if (Array.isArray(value)) {
    return value.length === 0
  }
  // object
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value)
}
