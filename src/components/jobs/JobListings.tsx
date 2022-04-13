import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, Container } from "react-bootstrap";

import { ActionButton } from "../ActionButton"
import ContentContainer from "../ContentContainer";
import NewListingButton from "../NewListingButton";
import { JobsTable } from "./JobsTable";

export const JobListings = () => {
  // TODO: owner sees their own listings only
  // TODO: taker sees all available listings
  // filter in backend according to user role?
  return (
    <React.Fragment>
      <JobsTable status="available" />
      <Col sm={3}>
        <NewListingButton />
      </Col>
    </React.Fragment>
  )
}
