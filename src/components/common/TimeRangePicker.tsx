import { FormikProps } from "formik";
import React, { ChangeEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { numericOptions, selectMinutes } from "../../shared";
import NumberOption from "../forms/NumberOption";
import DatePickerCalendar from "./../DatePickerCalendar";
import "../../css/time_range_picker.scss";

interface PropDefs {
  formik: FormikProps<any>;
}

export const TimeRangePicker = ({ formik }: PropDefs) => {
  const [t] = useTranslation();
  const { values, setFieldValue } = formik;
  const { start_time, end_time } = values;

  const updateValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const fieldConfig = target.name.split("_");
    const fieldName = fieldConfig[0] + "_time";
    const fieldPart = fieldConfig[1];

    const newValue = values[fieldName] as Date;
    if (fieldPart === "minutes") {
      newValue.setMinutes(parseInt(target.value));
    } else {
      newValue.setHours(parseInt(target.value));
    }

    setFieldValue(fieldName, newValue);
  };

  return (
    <div className="time-range-picker">
      <b>{t("job.times")}</b>
      <br />
      <DatePickerCalendar
        onChange={(value: Date) => {
          const { end_time, start_time } = values;
          value.setHours(start_time.getHours(), start_time.getMinutes(), 0, 0);
          const newEndDate: Date = new Date(value);
          newEndDate.setHours(end_time.getHours(), end_time.getMinutes());
          setFieldValue("start_time", value);
          setFieldValue("end_time", newEndDate, false);
        }}
        defaultValue={values.start_time}
      />
      <div className="rowflex justified">
        <p>
          <b>{t("job.start_time")}</b>
        </p>
        <span className="rowflex">
          <select
            name="start_hours"
            className="form-control"
            onChange={updateValue}
            value={start_time.getHours()}
          >
            {numericOptions(0, 23).map((val: number) => (
              <NumberOption value={val} key={val} />
            ))}
          </select>
          &nbsp; :&nbsp;
          <select
            name="start_minutes"
            className="form-control"
            onChange={updateValue}
            value={start_time.getMinutes()}
          >
            {selectMinutes.map((val: number) => (
              <NumberOption value={val} key={val} />
            ))}
          </select>
        </span>
      </div>
      <br />
      <div className="rowflex justified">
        <p>
          <b>{t("job.end_time")}</b>
        </p>

        <span className="rowflex">
          <select
            name="end_hours"
            className="form-control"
            onChange={updateValue}
            value={end_time.getHours()}
          >
            {numericOptions(0, 23).map((val: number) => (
              <NumberOption value={val} key={val} />
            ))}
          </select>
          &nbsp; :&nbsp;
          <select
            name="end_minutes"
            className="form-control"
            onChange={updateValue}
            value={end_time.getMinutes()}
          >
            {selectMinutes.map((val: number) => (
              <NumberOption value={val} key={val} />
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

export default TimeRangePicker;
