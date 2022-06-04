import React from 'react'
import { isYesterday, sameDay } from './dateFunctions'

interface PropDefs {
  currentMonth: number,
  date: Date,
  onClick: Function,
  selectedDate: Date,
}

export const CalendarDayButton = ({
  date,
  selectedDate,
  currentMonth,
  onClick,
}:PropDefs) => {
  const onkick = () => {
    onClick(date)
  }
  const thisMonth = currentMonth === date.getMonth()
  const amChosen = sameDay(selectedDate, date)

  return (
    <button
      onClick={onkick}
      className={
        (isYesterday(date) ? 'disabled ' : '') +
        (amChosen ? 'day-chosen ' : '') +
        (thisMonth ? 'active-month' : 'other-month')
      }>
      {date.getDate()}
    </button>
  )
}

export default CalendarDayButton