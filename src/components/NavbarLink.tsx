import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

interface PropDefs {
  title: string;
  path: string;
  icon: IconProp;
}

export const NavbarLink = ({ icon, title, path }: PropDefs) => {
  const [t] = useTranslation();

  const location = useLocation();

  let classes = "navbar-link";
  if (location?.pathname?.startsWith(path)) {
    classes += " active";
  }

  return (
    <li className={classes}>
      <Link to={path}>
        <FontAwesomeIcon icon={icon} />
        &nbsp;
        {t(title)}
      </Link>
    </li>
  );
};

NavbarLink.defaultProps = { path: "" };
