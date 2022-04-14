import React from "react";
import { Row } from "react-bootstrap";
import { Job } from "../../interfaces";
import ContentContainer from "../ContentContainer";
import { JobCol } from "./JobCol";

interface PropDefs {
  data: Job[]
}

export const JobRow = ({data}:PropDefs) => {
  if(!data || !data.length) return null
  return (
    <Row className="p-3">
      {data.map((job:Job) => <JobCol job={job} />)}
    </Row>
  )
}

export default JobRow
