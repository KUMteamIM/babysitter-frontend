import React from "react";
import { useNavigate } from "react-router";
import { Job } from "../../interfaces";
import { displayDateDayMonth, displayHourMinute, getJobDetails } from "../../shared";

interface PropDefs {
  job: Job;
}

export const JobTableRow = ({ job }: PropDefs) => {
  const { pay_rate, id, status, job_requests = [] } = job;
  const { hours, minutes, start_time, end_time, total_kids, total_pay } = getJobDetails(job)

  const navigate = useNavigate()
  const showJob = () => {
    navigate(`/jobs/${id}`)
  }
  return (
    <tr onClick={showJob}>
      <td>
        {displayDateDayMonth(new Date(start_time))}
      </td>
      <td>
        {displayHourMinute(new Date(start_time))} - {displayHourMinute(new Date(end_time))}
      </td>
      <td>
        {hours}h {minutes}m
      </td>
      <td>
        {total_kids}
      </td>
      <td className="price">
        {pay_rate} &euro;
      </td>
      <td className="price">
        {total_pay} &euro;
      </td>
      <td className="requests icon">
        {!!job_requests.length && status === 'available' && job_requests.length}
      </td>
    </tr>
  );
};

export default JobTableRow;
