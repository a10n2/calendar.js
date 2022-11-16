import { getDays } from './utils'

interface ICalendarItem {
  year: number
  month: number
  date: number
}

/**
 * get month calendar array!
 * ps: use getDay() function, `new Date()` month is use [0 - 11], not is [1 - 12]
 * @param year current year
 * @param month current month
 * @returns [[year, month, date]...] (length: 35)
 */
export function getSimpleCalendar(
  year: number,
  month: number
): Array<number[]> {
  const simpleCalendar: Array<number[]> = []
  const currentMonthDays = getDays(year, month)

  // 先获取当前月的上一个月的和下一个月的月头以及月尾
  const preYear = year - 1
  const afterYear = year + 1
  const preMonth = month - 1 === 0 ? 12 : month - 1
  const afterMonth = month + 1 === 13 ? 1 : month + 1

  // 获取当前月的一号是星期几
  // week range [0 - 6]
  const currentMonthOneDateWeek = new Date(year, month - 1, 1).getDay()
  const currentMonthLastDayWeek = new Date(
    year,
    month - 1,
    getDays(year, month)
  ).getDay()

  // get preMonth days
  const preMonthDays = getDays(preMonth === 12 ? preYear : year, preMonth)

  // 获取前面缺失的几天
  for (let i = currentMonthOneDateWeek - 1; i >= 0; i--) {
    simpleCalendar.push([
      preMonth === 12 ? preYear : year,
      preMonth,
      preMonthDays - i,
    ])
  }

  // 补齐当月的数据
  for (let i = 1; i <= currentMonthDays; i++) {
    simpleCalendar.push([year, month, i])
  }

  // 获取后面缺失的几天
  for (let i = 1; i <= 6 - currentMonthLastDayWeek; i++) {
    simpleCalendar.push([afterMonth === 1 ? afterYear : year, afterMonth, i])
  }

  return simpleCalendar
}

/**
 * get calendar! array item is object
 * @param year number
 * @param month number
 * @returns
 */
export function getCalendar(year: number, month: number): ICalendarItem[] {
  const simpleCalendar = getSimpleCalendar(year, month)
  const calendar = simpleCalendar.map(val => {
    return {
      year: val[0],
      month: val[1],
      date: val[2],
    }
  })
  return calendar
}

/**
 * TODO
 * provide a calendar operation to user
 * you can get last year or last month or next year or next month calendar
 */
export class Calendar {}
