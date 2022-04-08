import { faUser, faFemale } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCurrentUser } from "../../custom_hooks/user";
import { User } from "../../interfaces";
import { loadUser } from "../../user";
import ContentContainer from "../ContentContainer";
import UserImage from "../UserImage";
import CommonSpinner from "@lmu-med/ci-components/dist/components/CommonSpinner";
import { getDisplayName } from "../../shared";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CommonFieldList } from "../CommonFieldList";
import { Ratings } from "./Ratings";
import Stars from "../Stars";
import { useApiResponse } from "../../custom_hooks/shared";

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
        <Row>
          <Col className="mt-12 mb-24" sm={4}>
            <UserImage src={user?.image} type="large" />
            <Stars average={user?.average_rating} />
          </Col>
          <Col sm={8}>
            <CommonFieldList data={user} />
          </Col>
        </Row>
      </ContentContainer>
      <Ratings id={user?.id} />
    </>
  );
};

export default ProfileIndex
