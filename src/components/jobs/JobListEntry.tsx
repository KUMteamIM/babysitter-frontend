import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";
import { Job } from "../../interfaces";
import { iconByStatus } from "../../shared";
import { JobFragment } from "./JobFragment";

interface PropDefs {
  job: Job;
}

export const JobListEntry = ({ job }: PropDefs) => {
  const { pay_rate, id, status } = job;

  const navigate = useNavigate()
  const showJob = () => {
    navigate(`/jobs/${id}`)
  }
  return (
    <tr onClick={showJob}>
      <td className="times">
        <JobFragment job={job} />
      </td>
      <td>
        location
      </td>
      <td className="price">
        {pay_rate}&euro;
      </td>
      <td className="status">
        <FontAwesomeIcon icon={iconByStatus[status]} />
      </td>
    </tr>
  );
};

export default JobListEntry;
