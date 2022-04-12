import React from "react";
import { Job } from "../../interfaces";
import { displayDateDayMonth, displayHourMinute, getJobDetails } from "../../shared";

interface PropDefs {
  job: Job;
}
export const JobFragment = ({job}: PropDefs) => {
  const { hours, start_time, end_time, minutes } = getJobDetails(job);

  return (
    <React.Fragment>
      <b>{displayDateDayMonth(start_time)}</b> &nbsp;
      {displayHourMinute(start_time)}-{displayHourMinute(end_time)} Uhr
      <br />
      {hours}h {minutes}m
    </React.Fragment>
  );
};
