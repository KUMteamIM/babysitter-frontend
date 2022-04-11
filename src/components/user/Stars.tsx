import { faStar as regFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import './stars.scss';

interface PropDefs {
  average: number
}
export const Stars = ({average}:PropDefs) => {
  const starryNight: number[] = [0,1,2,3,4]
  const generateStar = (grade:number): any => {
    let icon = regFaStar
    if(Math.round(average) === grade) {
      icon = faStarHalfStroke
    } else if(average > grade) {
      icon = faStar
    }
    return <FontAwesomeIcon key={grade.toString()} icon={icon} />
  }

  return <Row>
    <Col className="stars">
    {starryNight.map(generateStar)}
    </Col>
  </Row>
}

Stars.defaultProps = {
  average: 2.5
}

export default Stars
