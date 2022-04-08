import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface PropDefs {
  icon?: IconProp,
  title?: string,
  path?: string,
}

export const IconHeader = ({icon, title, path}:PropDefs) => {
  const [t] = useTranslation()
  return (
    <h2>
      {icon && <FontAwesomeIcon icon={icon} transform="shrink-4" className="mr-12"></FontAwesomeIcon>}
      {title}
      {path && (<Link to={path}>{t("view_all")}</Link>)}
    </h2>
  )
}
