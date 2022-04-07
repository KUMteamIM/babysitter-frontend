import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Job } from "../../interfaces";

interface PropDefs {
  job: Job;
}

export const JobListEntry = ({ job }: PropDefs) => {
  const { description, start_time, end_time, pay_rate, id } = job;
  return (
    <Col sm={6}>
      <p>
        <Link to={`/jobs/${id}`}>
          {description}
          <br />
          {start_time} - {end_time} @ {pay_rate}&euro;
        </Link>
      </p>
    </Col>
  );
};

export default JobListEntry;
