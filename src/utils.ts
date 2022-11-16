interface CorrectYearAndMonth {
  year: number
  month: number
}

export function getDays(year: number, month: number): number {
  let _d: Date | null = new Date(year, month, 0)
  const days = _d.getDate()
  return days
}

/**
 * 返回当前年月的上一个月的正确年月
 * @param year 当前年份
 * @param month 当前月份
 * @returns { year: number, month: number }
 */
export function getCorrectYearAndMonthOfPre(
  year: number,
  month: number
): CorrectYearAndMonth {
  // 1 - 12
  if (month - 1 === 0) {
    return { year: year - 1, month: 12 }
  } else {
    return { year, month: month - 1 }
  }
}

/**
 * 返回当前年月的下一个月的正确年月
 * @param year 当前年份
 * @param month 当前月份
 * @returns { year: number, month: number }
 */
export function getCorrectYearAndMonthOfAfter(
  year: number,
  month: number
): CorrectYearAndMonth {
  if (month + 1 === 13) {
    return { year: year + 1, month: 1 }
  } else {
    return { year, month: month + 1 }
  }
}
