class Calendar {
  public date: Date
  public currentYear: number
  public currentMonth: number
  public currentDay: number
  public currentWeek: number

  constructor() {
    this.date = new Date()
    this.currentYear = this.date.getFullYear()
    this.currentMonth = this.date.getMonth() + 1
    this.currentDay = new Date(this.date).getDate()
    const week = new Date(this.date).getDay()
    if (week === 0) {
      this.currentWeek = 7
    } else {
      this.currentWeek = week
    }
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
}

new Calendar()
