import React, { ReactElement } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Job } from "../../interfaces";
import JobItem from "./JobItem";

interface PropDefs {
  job: Job;
}

export const JobCol = ({ job }: PropDefs):ReactElement | null => {
  if(!job) return null

  return (
    <Col key={job.id} sm={4}>
      <Link to={`/jobs/${job.id}`} key={job.id}>
        <JobItem job={job} />
      </Link>
    </Col>
  );
};
