import { faUserAltSlash, faUserTag } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useApiResponse } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job } from "../../interfaces";
import { iconByStatus } from "../../shared";
import CommonFieldList from "../CommonFieldList";
import ContentContainer from "../ContentContainer";
import { Ratings } from "../user/Ratings";
import { UserDetails } from "../user/UserDetails";
import { JobFragment } from "./JobFragment";

export const JobView = () => {
  const [job, setJob] = useState<Job|null>(null)
  const { id } = useParams()
  const result = useApiResponse(`/jobs/${id}`)
  // TODO: when owner, show taker
  // TODO: when taker, show owner
  const userDetails = useApiResponse(`/users/${id}`)
  const [t] = useTranslation()
  const currentUser = useCurrentUser()

  useEffect(() => {
    if(result[0]) setJob(result[0])
  }, [result])

  // TODO: show taker details when currentUser === owner and status === booked

  return (
    <>
      <ContentContainer
        result={result}
        title={t('listing')}
        icon={job && iconByStatus[job?.status]}
      >
        {job && <JobFragment job={job} /> }
        {job && <CommonFieldList data={job} />}
      </ContentContainer>
      <ContentContainer title={t('offered_by')} icon={faUserTag}>
        <UserDetails user={userDetails[0]?.data} />
      </ContentContainer>
      { job?.status === 'booked' && (
        <Row>

        <ContentContainer title="taker">
          Taker
        </ContentContainer>
        </Row>
      )}
    </>
  );
};

export default JobView;
