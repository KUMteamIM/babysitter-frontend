import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Job } from "../../interfaces";
import { displayDateDayMonth, displayHourMinute, getDateDetails } from "../../shared";

interface PropDefs {
  job: Job;
}

export const JobListEntry = ({ job }: PropDefs) => {
  const { description, pay_rate, id } = job;
  const { hours, start_time, end_time, minutes } = getDateDetails(job)

  const navigate = useNavigate()
  const showJob = () => {
    navigate(`/jobs/${id}`)
  }
  return (
    <tr onClick={showJob}>
      <td className="times">
        <b>{displayDateDayMonth(start_time)}</b> <br />
        {displayHourMinute(start_time)} - {displayHourMinute(end_time)} Uhr<br />
        {hours}h {minutes}m
      </td>
      <td>
        location
      </td>
      <td className="price">
        {pay_rate}&euro;
      </td>
    </tr>

  );
};

export default JobListEntry;
