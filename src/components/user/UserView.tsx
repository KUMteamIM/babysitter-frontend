import { faFemale, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useApiResponse } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { User } from "../../interfaces";
import { getDisplayName } from "../../shared";
import ContentContainer from "../ContentContainer";
import JobRow from "../jobs/JobRow";
import { Ratings } from "./Ratings";
import { UserDetails } from "./UserDetails";

export const UserView = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [t] = useTranslation()

  const [user, setUser] = useState<User | null>(null);

  const wantedId: string = id || (currentUser ? currentUser.id : '')
  const userData = useApiResponse(wantedId ? `users/${wantedId}` : '')
  const jobData = useApiResponse(wantedId ? `jobs` : '', 'get', { user_id: wantedId })

  useEffect(() => {
    if(userData[0]) setUser(userData[0].data);
  }, [userData]);

  const icon = user?.type === 'owner' ? faFemale : faUser

  const moreTitle = currentUser?.id == user?.id ? 'my_listings' : 'listings'

  return (
    <>
    <Row>
      <ContentContainer result={userData} icon={icon} title={getDisplayName(user)}>
        <UserDetails user={user} />
      </ContentContainer>
      <Ratings id={user?.id} />
    </Row>
    <Row>
      {jobData[0] && jobData[0].length && (
        <ContentContainer result={jobData} title={t(moreTitle)}>
          <JobRow data={jobData} />
        </ContentContainer>
      )}
    </Row>
    </>
  );
};

export default UserView
