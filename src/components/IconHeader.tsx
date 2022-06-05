import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { faBars, faList, faPlus } from "@fortawesome/free-solid-svg-icons";

interface PropDefs {
  icon?: IconProp;
  title?: string;
  createPath?: string;
  path?: string;
}

export const IconHeader = ({ icon, title, path, createPath }: PropDefs) => {
  const [t] = useTranslation();
  return (
    <h2 className="rowflex justified">
      <span>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            transform="shrink-4"
            className="mr-12"
          ></FontAwesomeIcon>
        )}
        {title}
      </span>
      <span className="text-right">
        {path && (
          <Link to={path}>
            <FontAwesomeIcon icon={faBars} />
            &nbsp;
            {t("view_all")}
          </Link>
        )}
        {createPath && (
          <Link to={createPath}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;
            {t("create_new")}
          </Link>
        )}
      </span>
    </h2>
  );
};
