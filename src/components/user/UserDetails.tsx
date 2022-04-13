import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { User } from "../../interfaces";
import UserImage from "../UserImage";
import Stars from "./Stars";
import CommonFieldList from "../CommonFieldList";
import { getDisplayName } from "../../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faFemale, faMale, faShieldDog, faSmoking, faSmokingBan } from "@fortawesome/free-solid-svg-icons";
import LocationView from "../LocationView";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

interface PropDefs {
  user: User|null;
}

export const UserDetails = ({ user }: PropDefs) => {
  const [t] = useTranslation()
  const location = useLocation()

  console.log(location.pathname)


  if(!user) return null;

  const { image, pay_rate, bio, smoker, has_pets, gender, average_rating, locations, id } = user

  return (
    <Row className="p-3">
      <Col sm={4}>
        <UserImage src={image} type="large" />
        <h4 className="mt-3">
          <Stars average={average_rating} />
          <FontAwesomeIcon icon={smoker ? faSmoking : faSmokingBan} />
          {has_pets && <FontAwesomeIcon icon={faDog} />}
          <FontAwesomeIcon icon={gender === 'M' ? faMale : faFemale} />
        </h4>
      </Col>
      <Col sm={8}>
        <h3>{getDisplayName(user)}</h3>
        <p><i>{bio}</i></p>
        <p>{pay_rate} &euro;</p>
        {locations?.length && <LocationView location={locations[0]} />}
        {location.pathname !== `/users/${id}` &&(
        <Link to={`/users/${user.id}`}>
          &raquo; {t('view_profile')}
        </Link>
        )}
      </Col>
    </Row>
  );
};
