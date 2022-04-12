import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface PropDefs {
  label?: string,
  children?: any,
  required: boolean,
  htmlFor?: string,
}

export const LabeledRow = ({ children, label, required, htmlFor }:PropDefs) => {
  return (
    <Row>
      <Col sm={4}>
        <label className="control-label" htmlFor={htmlFor}>
          {label}
          {required && <abbr title="Pflichtfeld">*</abbr>}
        </label>
      </Col>
      <Col sm={8}>{children}</Col>
    </Row>
  );
};

LabeledRow.defaultProps = {
  required: false,
};
