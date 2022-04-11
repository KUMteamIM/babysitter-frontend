import { faFemale, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useApiResponse } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { User } from "../../interfaces";
import { getDisplayName } from "../../shared";
import ContentContainer from "../ContentContainer";
import { Ratings } from "./Ratings";
import { UserDetails } from "./UserDetails";

export const ProfileIndex = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);

  const wantedId: string = id || (currentUser ? currentUser.id : '')
  const result = useApiResponse(wantedId ? `users/${wantedId}` : '')

  useEffect(() => {
    if(result[0]) setUser(result[0].data);
  }, [result]);

  const icon = user?.type === 'owner' ? faFemale : faUser

  return (
    <>
      <ContentContainer result={result} icon={icon} title={getDisplayName(user)}>
        <UserDetails user={user} />
      </ContentContainer>
      <Ratings id={user?.id} />
    </>
  );
};

export default ProfileIndex
