import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Job } from "../../interfaces";
import JobItem from "./JobItem";

interface PropDefs {
  job: Job;
}
export const JobCol = ({ job }: PropDefs) => {
  return (
    <Col key={job.id}>
      <Link to={`/jobs/${job.id}`} key={job.id}>
        <JobItem job={job} />
      </Link>
    </Col>
  );
};
