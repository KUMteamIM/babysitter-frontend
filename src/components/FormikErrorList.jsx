import PropTypes from "prop-types";
export const FormikErrorList = ({ errors }) => {
  const errorEntry = (item, index) => {
    const [key, value] = item;
    return <li key={`item${index + 1}`}>{value}</li>;
  };

  const entries = Object.entries(errors);

  if (!entries.length) return null;

  return <ul className="formik-error-list">{entries.map(errorEntry)}</ul>;
};

FormikErrorList.defaultProps = {
  errors: {},
};
FormikErrorList.propTypes = {
  errors: PropTypes.object,
};
