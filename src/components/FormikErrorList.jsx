import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
export const FormikErrorList = ({ errors }) => {
  const errorEntry = (item, index) => {
    const [key, value] = item;
    return <li key={`item${index + 1}`}>{value}</li>;
  };

  const entries = Object.entries(errors);

  if (!entries.length) return null;

  return (
    <Alert variant="danger">
      <ul>{entries.map(errorEntry)}</ul>
    </Alert>
  );
};

FormikErrorList.defaultProps = {
  errors: {},
};
FormikErrorList.propTypes = {
  errors: PropTypes.object,
};
