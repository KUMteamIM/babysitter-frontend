import React from "react";
import { JobsTable } from "./jobs/JobsTable";
import { useCurrentUser } from "../custom_hooks/user";
import { Favorites } from "./Favorites";
import { JobRequestIndex } from "./job_requests/JobRequestIndex";
import ContentContainer from "./ContentContainer";
import { useApiResponse } from "../custom_hooks/shared";
import JobRow from "./jobs/JobRow";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const currentUser = useCurrentUser();
  const bookedJobs = useApiResponse(currentUser?.id ? `jobs` : '', 'get', { user_id: currentUser?.id, status: 'booked' })
  const jobData = useApiResponse(currentUser?.id ? `jobs` : '', 'get', { user_id: currentUser?.id })
  const [t] = useTranslation()

  if (currentUser?.type === "owner") {
    return (
      <>
        <Row>
          {bookedJobs && bookedJobs[0] ? (
            <ContentContainer result={bookedJobs} title={t('next_bookings')} path="/jobs?status=booked">
              <JobRow data={bookedJobs[0]} />
            </ContentContainer>
          ) : null }
          <JobRequestIndex />
        </Row>
        {jobData && jobData[0] ? (
          <Row>
            <ContentContainer result={jobData} title={t('my_listings')} path="/jobs" createPath="/jobs/new">
              <JobRow data={jobData[0]} />
            </ContentContainer>
          </Row>
        ) : null }
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
