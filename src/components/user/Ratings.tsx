import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useApiResponse } from "../../custom_hooks/shared";
import { Rating } from "../../interfaces";
import ContentContainer from "../ContentContainer";
import Stars from "./Stars";

interface PropDefs {
  id?: string;
}
export const Ratings = ({ id }: PropDefs) => {
  const result = useApiResponse(id ? `/users/${id}/ratings` : "");
  const [t] = useTranslation()

  return (
    <ContentContainer result={result} title={t('ratings')} icon={faStar}>
      <Row className="p-3">
        <Col>
          {result && result[0] && result[0].length ? (
            result[0].map((rating: Rating, index: number) => {
              return (
                <React.Fragment key={index.toString()}>
                  <Stars average={rating.stars} />
                  <i>{rating.review}</i>
                  <br />
                </React.Fragment>
              );
            })
          ) : (
            <p>Keine Ratings</p>
          )}
        </Col>
      </Row>
    </ContentContainer>
  );
};
