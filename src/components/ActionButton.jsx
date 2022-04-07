import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

export const ActionButton = (props) => {
  const { desc, title, icon, onClick, className } = props;
  const [t] = useTranslation();
  return (
    <>
      <Button onClick={onClick} className={className}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {t(title)}
      </Button>
      {desc && <p className="small">{t(desc)}</p>}
    </>
  );
};

ActionButton.defaultProps = { icon: "", title: "", variant: "primary" };

ActionButton.propTypes = {
  desc: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  title: PropTypes.string,
};
