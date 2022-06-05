import { faFemale, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useApiResponse, useUser } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job, User } from "../../interfaces";
import { getDisplayName } from "../../shared";
import ContentContainer from "../ContentContainer";
import JobRow from "../jobs/JobRow";
import { Ratings } from "./Ratings";
import { UserDetails } from "./UserDetails";

export const UserView = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [t] = useTranslation()

  const wantedId: string = id || (currentUser ? currentUser.id : '')
  const userData = useUser(wantedId)
  const [user] = userData
  const jobData = useApiResponse(wantedId ? `jobs` : '', 'get', { user_id: wantedId })
  const jobs = jobData[0] as Job[]

  const icon = user?.type === 'owner' ? faFemale : faUser
  const moreTitle = currentUser?.id === user?.id ? 'my_listings' : 'listings'

  return (
    <>
    <Row>
      <ContentContainer result={userData} icon={icon} title={getDisplayName(user)}>
        <UserDetails user={user} />
      </ContentContainer>
      <Ratings id={user?.id} />
    </Row>
    <Row>
      {jobs && jobs.length && (
        <ContentContainer result={jobData} title={t(moreTitle)}>
          <JobRow data={jobs} />
        </ContentContainer>
      )}
    </Row>
    </>
  );
};

export default UserView
