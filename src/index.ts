export default class Calendar {
  public date: Date
  public currentYear: number
  public currentMonth: number
  public currentDay: number
  public currentWeek: number

  constructor() {
    this.date = new Date()
    this.currentYear = this.date.getFullYear()
    // this.currentMonth = this.date.getMonth() + 1
    this.currentMonth = this.date.getMonth() + 1
    this.currentDay = new Date(this.date).getDate()
    const week = new Date(this.date).getDay()
    if (week === 0) {
      this.currentWeek = 7
    } else {
      this.currentWeek = week
    }
    this.getCurrentMonthCalendar(this.currentYear, this.currentMonth)
  }

  /**
   * 获取当前月拥有多少天
   * @returns number
   */
  public getDays(year: number, month: number): number {
    let _d: Date | null = new Date(year, month, 0)
    const days = _d.getDate()
    _d = null
    return days
  }

  // 在new Date()的时候，month哪怕是正确的 但是在底层处理的时候，会按照 0 - 11来处理月份
  public getCurrentMonthCalendar(year: number, month: number): Date[] {
    const simpleCalendar: Array<number[]> = []
    // 先获取当前月的上一个月的和下一个月的月头以及月尾
    const preYear = year - 1
    const afterYear = year + 1
    const preMonth = month - 1 === 0 ? 12 : month - 1
    const afterMonth = month + 1 === 13 ? 1 : month + 1
    console.log('pre after :>>', { preYear, preMonth, afterYear, afterMonth })
    // 获取当前月的一号是星期几
    // week range [0 - 6]
    const currentMonthOneDateWeek = new Date(year, month - 1, 1).getDay()
    const currentMonthLastDayWeek = new Date(
      year,
      month - 1,
      this.getDays(year, month)
    ).getDay()

    console.log('week :>>', currentMonthOneDateWeek, currentMonthLastDayWeek)
    // get preMonth days
    const preMonthDays = this.getDays(
      preMonth === 12 ? preYear : year,
      preMonth
    )
    const afterMonthDays = this.getDays(
      afterMonth === 1 ? afterYear : year,
      afterMonth
    )

    // 获取前面缺失的几天
    for (let i = currentMonthOneDateWeek - 1; i >= 0; i--) {
      console.log(i)
      simpleCalendar.push([
        preMonth === 12 ? preYear : year,
        preMonth,
        preMonthDays - i,
      ])
    }

    simpleCalendar.push([])

    // 获取后面缺失的几天
    for (let i = 1; i <= currentMonthLastDayWeek; i++) {
      simpleCalendar.push([afterMonth === 1 ? afterYear : year, afterMonth, i])
    }

    console.log(simpleCalendar)

    console.log(preMonthDays, afterMonthDays)
    return []
  }
}

new Calendar()
