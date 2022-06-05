import React from "react";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useApiResponse } from "../custom_hooks/shared";
import { useCurrentUser } from "../custom_hooks/user";
import { Job } from "../interfaces";
import ContentContainer from "./ContentContainer";
import JobRow from "./jobs/JobRow";
import { JobsTable } from "./jobs/JobsTable";
import { JobRequestIndex } from "./job_requests/JobRequestIndex";

export const Home = () => {
  const currentUser = useCurrentUser();
  const bookedJobData = useApiResponse(currentUser?.id ? `jobs` : '', 'get', { user_id: currentUser?.id, status: 'booked' })
  const bookedJobs = bookedJobData[0] as Job[]
  const jobData = useApiResponse(currentUser?.id ? `jobs` : '', 'get', { user_id: currentUser?.id })
  const jobs = jobData[0] as Job[]
  const [t] = useTranslation()

  if (currentUser?.type === "owner") {
    return (
      <>
        <Row>
          {bookedJobs ? (
            <ContentContainer result={bookedJobData} title={t('next_bookings')} path="/jobs/booked">
              <JobRow data={bookedJobs} />
            </ContentContainer>
          ) : null }
          <JobRequestIndex />
        </Row>
        {jobs && (
          <Row>
            <ContentContainer result={jobData} title={t('my_listings')} path="/jobs" createPath="/jobs/new">
              <JobRow data={jobs} />
            </ContentContainer>
          </Row>
        ) }
      </>
    );
  } else {
    return (
      <>
        <JobsTable status="booked" />
      </>
    );
  }
};
