import React from "react";
import { Row } from "react-bootstrap";
import { Job } from "../../interfaces";
import { JobCol } from "./JobCol";

interface PropDefs {
  data: Job[];
}

export const JobRow = ({ data }: PropDefs) => {
  if (!data || !data.length) return null;

  return (
    <Row className="p-3">
      {data.map((job: Job, index: number) => <JobCol job={job} key={index.toString()} />)}
    </Row>
  );
};

export default JobRow;
