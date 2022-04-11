import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { User } from "../../interfaces";
import UserImage from "../UserImage";
import Stars from "./Stars";
import CommonFieldList from "../CommonFieldList";

interface PropDefs {
  user: User|null;
}

export const UserDetails = ({ user }: PropDefs) => {
  console.log(user)
  if(!user) return null;
  return (
    <Row>
      <Col className="mt-12 mb-24" sm={4}>
        <UserImage src={user?.image} type="large" /><br />
        <Stars average={user?.average_rating} />
      </Col>
      <Col sm={8}>
        <CommonFieldList data={user} />
      </Col>
    </Row>
  );
};
