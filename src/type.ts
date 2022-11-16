export interface CalendarItem {
  year: number
  month: number
  date: number
}

export interface CalendarOptions {
  type?: 'simple' | 'complex'
  year?: number
  month?: number
}

export interface CalendarCache {
  year: number
  month: number
  calendar: ReturnCalendar
}

export type SimpleCalendar = [number, number, number][]
export type ComplexCalendar = CalendarItem[]
export type ReturnCalendar = SimpleCalendar | ComplexCalendar
