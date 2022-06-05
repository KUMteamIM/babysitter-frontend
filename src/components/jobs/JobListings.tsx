import React from "react";
import { Col } from "react-bootstrap";
import CreateJobButton from "../NewListingButton";
import { JobsTable } from "./JobsTable";


export const JobListings = () => {
  // TODO: owner sees their own listings only
  // TODO: taker sees all available listings
  // filter in backend according to user role?
  return (
    <React.Fragment>
      <JobsTable status="available" />
      <Col sm={3}>
        <CreateJobButton />
      </Col>
    </React.Fragment>
  )
}
