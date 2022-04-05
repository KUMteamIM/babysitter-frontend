import React from "react";
import PropTypes from "prop-types";
import { IconHeader } from "./IconHeader";
import Col from "react-bootstrap/Col";

const ContentContainer = ({ icon, title, children }) => {
  return (
    <Col sm={6}>
      <IconHeader icon={icon}>{title}</IconHeader>
      {children}
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
