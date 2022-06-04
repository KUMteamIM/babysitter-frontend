import React, { useEffect, useState } from 'react'
import {
  getCalendarDaysMatrix,
  getDayByIndex,
  getDayZeroHour,
} from './dateFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import CalendarDayButton from './CalendarDayButton'
import '../css/date_picker_calendar.sass'

interface PropDefs {
  onChange: Function,
  defaultValue: Date
}

export const DatePickerCalendar = ({ onChange, defaultValue }:PropDefs) => {
  const dayNames = new Array(7)
    .fill(1)
    .map((a, index) => (<p key={index}>{getDayByIndex(index)}</p>))

  const [selectedDate, setSelectedDate] = useState<Date>(defaultValue)
  const [currentMonth, setCurrentMonth] = useState<Date>(defaultValue)

  const month = new Intl.DateTimeFormat(navigator.language, {
    month: 'long',
    year: 'numeric',
  }).format(currentMonth)

  const thisMonthDays = getCalendarDaysMatrix(currentMonth)

  useEffect(() => {
    if (
      getDayZeroHour(defaultValue).getTime() !==
      getDayZeroHour(selectedDate).getTime()
    ) {
      setSelectedDate(defaultValue)
      setCurrentMonth(defaultValue)
    }
  }, [defaultValue, selectedDate])

  useEffect(() => {
    if (selectedDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(selectedDate)
    }
  }, [selectedDate, currentMonth])

  const prevMonth = () => {
    const nm = new Date(currentMonth)
    nm.setMonth(nm.getMonth() - 1)
    setCurrentMonth(nm)
  }

  const nextMonth = () => {
    const nm = new Date(currentMonth)
    nm.setMonth(nm.getMonth() + 1)
    setCurrentMonth(nm)
  }

  const onDayClick = (newDate:Date) => {
    onChange(newDate)
  }

  const now = getDayZeroHour()
  now.setDate(1)
  const nm = new Date(currentMonth.getTime())
  nm.setHours(0, 0, 0, 0)
  nm.setDate(1)
  const disablePast = now.getTime() >= nm.getTime()

  return (
    <div className="calendar-months mb12">
      <div className="skip-months rowflex justified">
        <div
          className={'pointer ' + (disablePast ? ' disabled' : '')}
          onClick={prevMonth}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        {month}
        <div className="pointer" onClick={nextMonth}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className="calendar-days">
        <div className="calendar-day-labels rowflex justified">{dayNames}</div>
        <div className="calendar-day-buttons">
          {thisMonthDays.map((date, index) => (
            <CalendarDayButton
              date={date}
              onClick={onDayClick}
              currentMonth={currentMonth.getMonth()}
              selectedDate={selectedDate}
              key={index + 1}
            />
          ))}
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

DatePickerCalendar.defaultProps = {
  defaultValue: new Date(),
}

export default DatePickerCalendar
