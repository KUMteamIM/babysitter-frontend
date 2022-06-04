/**
 * Returns the localized short day name from index, i.e. 0 = Mon
 * @param {number} index
 */
 export const getDayByIndex = (index: number):string => {
  const date = new Date(Date.UTC(1999, 1, 1 + index, 0, 0, 0))
  const label = new Intl.DateTimeFormat(navigator.language, {
    weekday: 'short',
  }).format(date)
  return label
}

/**
 * Returns index of the weekday, where Monday returns 0
 * @param {date} someDate
 */
 export const getWeekday = (someDate: Date):number => {
  return (someDate.getDay() + 6) % 7
}

/**
 * Returns a list of dates that make up a calendar for the selected month
 * beginning from the first Monday before or equal to that month's first day
 * @param {date} currentMonth
 */
export const getCalendarDaysMatrix = (currentMonth: Date):Array<Date> => {
  const firstMonday = new Date(currentMonth)
  firstMonday.setDate(1)
  while (firstMonday.getDay() !== 1) {
    firstMonday.setDate(firstMonday.getDate() - 1)
  }

  const alldays = [firstMonday]
  while (alldays.length < 35) {
    const tmr = new Date(alldays[alldays.length - 1])
    tmr.setDate(tmr.getDate() + 1)
    alldays.push(tmr)
    const datmr = new Date(tmr)
    datmr.setDate(datmr.getDate() + 1)
    if (datmr.getMonth() > tmr.getMonth() && tmr.getDay() === 0) {
      break
    }
  }
  return alldays
}

/**
 * Returns date object at first second of the day
 * if no date object is passed, it returns today at 0
 * @param {date} date
 */
 export const getDayZeroHour = (date?: Date):Date => {
  var wantedDay = date ? new Date(date.getTime()) : new Date()
  wantedDay.setHours(0, 0, 0, 0)
  return wantedDay
}

/**
 * Check if two dates are on the same day
 * @param {date} d1
 * @param {date} d2
 */
 export const sameDay = (d1:Date, d2:Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export const isPast = (date:Date) => {
  return date.getTime() < Date.now()
}

export const isYesterday = (date:Date): boolean => {
  const today = getDayZeroHour().getTime()
  return date.getTime() < today
}

export const hourMinute = (seconds: number): string => {
  const hours = Math.floor(seconds / 60 / 60)
  const minutes = (seconds - hours * 60 * 60) / 60
  const hourDisplay = twoDigitString(hours)
  const minuteDisplay = twoDigitString(minutes)
  return `${hourDisplay}:${minuteDisplay}`
}

export const twoDigitString = (nom: number|string): string => {
  nom = parseInt(nom.toString())
  return nom < 10 ? '0' + nom.toString() : nom.toString()
}
