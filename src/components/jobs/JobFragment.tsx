import React from "react";
import { Job } from "../../interfaces";
import { displayDateDayMonth, displayHourMinute, getDateDetails } from "../../shared";

interface PropDefs {
  job: Job;
}
export const JobFragment = ({job}: PropDefs) => {
  const { hours, start_time, end_time, minutes } = getDateDetails(job);

  return (
    <React.Fragment>
      <b>{displayDateDayMonth(start_time)}</b> <br />
      {displayHourMinute(start_time)} - {displayHourMinute(end_time)} Uhr
      <br />
      {hours}h {minutes}m
    </React.Fragment>
  );
};
