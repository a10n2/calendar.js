import {
  getDays,
  getCorrectYearAndMonthOfPre,
  getCorrectYearAndMonthOfAfter,
  isToday,
} from './utils'

import {
  CalendarCache,
  CalendarItem,
  CalendarOptions,
  SimpleCalendar,
  ReturnCalendar,
} from './type'

const _cache: CalendarCache = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  calendar: [],
}

/**
 * get month calendar array!
 * ps: use getDay() function, `new Date()` month is use [0 - 11], not is [1 - 12]
 * @param year current year
 * @param month current month
 * @returns [[year, month, date]...] (length: 35)
 */
function getSimpleCalendar(year: number, month: number): SimpleCalendar {
  const simpleCalendar: SimpleCalendar = []
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
      false,
    ])
  }

  // 补齐当月的数据
  for (let i = 1; i <= currentMonthDays; i++) {
    simpleCalendar.push([year, month, i, isToday([year, month, i])])
  }

  // 获取后面缺失的几天
  for (let i = 1; i <= 6 - currentMonthLastDayWeek; i++) {
    simpleCalendar.push([
      afterMonth === 1 ? afterYear : year,
      afterMonth,
      i,
      false,
    ])
  }

  return simpleCalendar
}

/**
 * get calendar! array item is object
 * @param year number
 * @param month number
 * @returns
 */
function getCalendar(year: number, month: number): CalendarItem[] {
  const simpleCalendar = getSimpleCalendar(year, month)
  const calendar = simpleCalendar.map(val => {
    return {
      year: val[0],
      month: val[1],
      date: val[2],
      isToday: val[3],
    }
  })
  return calendar
}

/**
 * provide a calendar operation to user
 * you can get last year or last month or next year or next month calendar
 */
export default class Calendar {
  public currentYear: number
  public currentMonth: number
  public currentCalendar: ReturnCalendar
  public type: 'simple' | 'complex' = 'simple'

  constructor(options: CalendarOptions) {
    this.type = options.type ?? 'simple'
    this.currentMonth = options.month ?? new Date().getMonth() + 1
    this.currentYear = options.year ?? new Date().getFullYear()

    this.currentCalendar =
      options.type === 'simple'
        ? getSimpleCalendar(this.currentYear, this.currentMonth)
        : getCalendar(this.currentYear, this.currentMonth)

    _cache.year = this.currentYear
    _cache.month = this.currentMonth
    _cache.calendar = this.currentCalendar
  }

  // 复原年月份
  public restoreCalendar(): Calendar {
    this.currentYear = _cache.year
    this.currentMonth = _cache.month
    this.currentCalendar = _cache.calendar
    return this
  }

  // 获取上个月的日历数据
  public getPreMonthCalendar(): ReturnCalendar {
    const { year: _year, month: _month } = getCorrectYearAndMonthOfPre(
      this.currentYear,
      this.currentMonth
    )

    this.currentYear = _year
    this.currentMonth = _month

    if (this.type === 'simple') {
      return getSimpleCalendar(_year, _month)
    } else {
      return getCalendar(_year, _month)
    }
  }
  // 获取下一个月的日历数据
  public getAfterMonthCalendar(): ReturnCalendar {
    const { year: _year, month: _month } = getCorrectYearAndMonthOfAfter(
      this.currentYear,
      this.currentMonth
    )

    this.currentYear = _year
    this.currentMonth = _month

    if (this.type === 'simple') {
      return getSimpleCalendar(_year, _month)
    } else {
      return getCalendar(_year, _month)
    }
  }

  // 获取去年这个月的日历数据
  public getPreYearCalendar(): ReturnCalendar {
    --this.currentYear
    if (this.type === 'simple') {
      return getSimpleCalendar(this.currentYear, this.currentMonth)
    } else {
      return getCalendar(this.currentYear, this.currentMonth)
    }
  }
  // 获取明年这个月的日历数据
  public getAfterYearCalendar(): ReturnCalendar {
    ++this.currentYear
    if (this.type === 'simple') {
      return getSimpleCalendar(this.currentYear, this.currentMonth)
    } else {
      return getCalendar(this.currentYear, this.currentMonth)
    }
  }
}
