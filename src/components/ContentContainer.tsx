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
  path?: string,
}

const ContentContainer = ({ icon, title, children, path }:PropDefs) => {
  return (
    <Col sm={6} className="content-container">
      <IconHeader icon={icon} title={title} path={path} />
      <Container className="contents">
        {children}
      </Container>
    </Col>
  );
};

ContentContainer.defaultProps = {
  title: "",
};

export default ContentContainer;
