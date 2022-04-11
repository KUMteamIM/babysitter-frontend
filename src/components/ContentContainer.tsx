import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CommonSpinner from "@lmu-med/ci-components/dist/components/CommonSpinner";
import React from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { IconHeader } from "./IconHeader";

interface PropDefs {
  icon?: IconProp;
  children?: any;
  title: string;
  path?: string;
  result?: any;
  className: string
}

const ContentContainer = ({
  icon,
  title,
  children,
  path,
  result,
  className
}: PropDefs) => {
  const [response, loading, error] = result || [null, false, false]

  return (
    <Col className={`content-container ${className}`}>
      <IconHeader icon={icon} title={title} path={path} />
      {error && <Alert variant="danger">{error.message}</Alert>}
      {loading ? (
        <CommonSpinner />
      ) : (
        <div className="contents">{children}</div>
      )}
    </Col>
  );
};

ContentContainer.defaultProps = {
  title: "",
  loading: false,
  className: '',
};

export default ContentContainer;
