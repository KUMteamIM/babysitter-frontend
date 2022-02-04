import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ContentContainer.module.css"; // Import css modules stylesheet as styles
const ContentContainer = ({ icon, title, children, contentStyle }) => {
  return (
    <div className="content-container">
      <div className={styles.content}>
        <FontAwesomeIcon icon={icon} />
        <h2>{title}</h2>
      </div>
      <div className={styles.requested}>{children}</div>
    </div>
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
