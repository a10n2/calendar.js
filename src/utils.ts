export function getDays(year: number, month: number): number {
  let _d: Date | null = new Date(year, month, 0)
  const days = _d.getDate()
  return days
}
