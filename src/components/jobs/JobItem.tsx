import { faChild, faChildDress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Job } from "../../interfaces";
import { displayDateDayMonth, displayHourMinute, getJobDetails, iconByStatus } from "../../shared";

interface PropDefs {
  job: Job
}

export const JobItem = ({job}:PropDefs) => {
  const jobDetails = getJobDetails(job);
  const icon = iconByStatus[job.status]

  return (
    <div className="p-2 job-request-details rowflex" style={{width: '100%'}}>
      {!!icon && (
      <h4>
        <FontAwesomeIcon icon={icon} />
      </h4>)}
      <div className="rowflex space-between"
        style={{ width: "100%", marginLeft: "8px" }}
      >
        <span>
          <b>{displayDateDayMonth(jobDetails.start_time)}</b>
          <br />
          {displayHourMinute(jobDetails.start_time)}-
          {displayHourMinute(jobDetails.end_time)}
        </span>
        <span>
          <FontAwesomeIcon icon={faChild} />
          <FontAwesomeIcon icon={faChildDress} /> {jobDetails.total_kids}
          <br />
          {jobDetails.total_pay} &euro;
        </span>
      </div>
    </div>
  )
}

export default JobItem;
