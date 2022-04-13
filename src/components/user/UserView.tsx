import { faFemale, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useApiResponse } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { User } from "../../interfaces";
import { getDisplayName, iconByStatus } from "../../shared";
import ContentContainer from "../ContentContainer";
import { JobsTable } from "../jobs/JobsTable";
import { Ratings } from "./Ratings";
import { UserDetails } from "./UserDetails";

export const UserView = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [t] = useTranslation()

  const [user, setUser] = useState<User | null>(null);

  const wantedId: string = id || (currentUser ? currentUser.id : '')
  const result = useApiResponse(wantedId ? `users/${wantedId}` : '')
  const jobResult = useApiResponse(wantedId ? `jobs` : '', 'get', { user_id: wantedId })

  useEffect(() => {
    if(result[0]) setUser(result[0].data);
  }, [result]);

  const icon = user?.type === 'owner' ? faFemale : faUser

  const moreTitle = currentUser?.id == user?.id ? 'my_listings' : 'listings'

  return (
    <>
      <ContentContainer result={result} icon={icon} title={getDisplayName(user)}>
        <UserDetails user={user} />
      </ContentContainer>
      <Ratings id={user?.id} />
      <Row>
        {jobResult[0] && jobResult[0].length && (
          <ContentContainer result={jobResult} title={t(moreTitle)}>
            offerings
          </ContentContainer>
        )}
      </Row>
    </>
  );
};

export default UserView
