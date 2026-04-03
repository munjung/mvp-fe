const CURRENT_YEAR = new Date().getFullYear()

export const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1998 + 1 }, (_, i) => {
  const year = 1998 + i
  return {
    label: String(year),
    value: String(year),
  }
})