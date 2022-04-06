import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PropDefs {
  icon: IconProp,
  title?: string,
  link?: object,
}

export const IconHeader = ({icon, title, link}:PropDefs) => {
  return (
    <h2>
      <FontAwesomeIcon icon={icon} transform="shrink-4" className="mr-12"></FontAwesomeIcon>
      {title}
      {link ? link : ''}
    </h2>
  )
}
