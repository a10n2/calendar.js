import { Calendar } from './dist/index.esm.js'

const calendar = new Calendar({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  type: 'simple',
})

console.log(calendar.currentCalendar)

console.log(calendar.getPreMonthCalendar())

console.log(calendar.getPreMonthCalendar())

console.log(calendar.restoreCalendar().currentCalendar)
