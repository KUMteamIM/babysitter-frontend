import React from "react";
import PropTypes from "prop-types";
import { IconHeader } from "./IconHeader";
import Col from "react-bootstrap/Col";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Container } from "react-bootstrap";

interface PropDefs {
  icon: IconProp,
  children?: any,
  title: string,
  link?: object,
}

const ContentContainer = ({ icon, title, children, link }:PropDefs) => {
  return (
    <Col sm={6} className="content-container">
      <IconHeader icon={icon} title={title} link={link} />
      <Container className="contents">

      {children}
      </Container>
    </Col>
  );
};

ContentContainer.defaultProps = {
  icon: "question",
  title: "",
  contentStyle: "",
};

ContentContainer.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
};

export default ContentContainer;
