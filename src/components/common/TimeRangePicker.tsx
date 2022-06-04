import React, { ChangeEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { displayDate, numericOptions, selectMinutes } from "../../shared";
import NumberOption from "../forms/NumberOption";
import DatePickerCalendar from "./../DatePickerCalendar";

interface PropDefs {
  formik: any
}
export const TimeRangePicker = ({formik}:PropDefs) => {
  const [t] = useTranslation();
  const { values, setFieldValue } = formik;
  const { start_time, end_time } = values

  const updateValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const fieldConfig = target.name.split("_")
    const fieldName = fieldConfig[0] + '_time'
    const fieldPart = fieldConfig[1]

    const newValue = values[fieldName] as Date
    if(fieldPart === 'minutes') {
      newValue.setMinutes(parseInt(target.value))
    } else {
      newValue.setHours(parseInt(target.value))
    }
    setFieldValue(fieldName, newValue);
  };

  return (
    <>
    {t("job.times")}
    <DatePickerCalendar
      onChange={(value: Date) => {
        formik.setFieldValue("start_time", value);
        const newEndDate: Date = new Date(value)
        const { end_time } = values
        newEndDate.setHours(end_time.getHours(), end_time.getMinutes())
        formik.setFieldValue("end_time", newEndDate);
      }}
      defaultValue={values.start_time}
    />
    {t("job.start_time")} {displayDate(values.start_time)}<br />
    <select name="start_hours" onChange={updateValue} value={start_time.getHours()}>
      {numericOptions(0, 23).map((val: number) => <NumberOption value={val} key={val} />)}
    </select> : <select name="start_minutes" onChange={updateValue} value={start_time.getMinutes()}>
      {selectMinutes.map((val: number) => <NumberOption value={val} key={val} />)}
    </select>
    <br />
    {t('job.end_time')} {displayDate(values.end_time)}<br />
    <select name="end_hours" onChange={updateValue} value={end_time.getHours()}>
      {numericOptions(0, 23).map((val: number) => <NumberOption value={val} key={val} />)}
    </select> : <select name="end_minutes" onChange={updateValue} value={end_time.getMinutes()}>
      {selectMinutes.map((val: number) => <NumberOption value={val} key={val} />)}
    </select>
    </>
  )
}

export default TimeRangePicker;