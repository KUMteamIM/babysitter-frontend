import React from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PropDefs {
  icon: IconName,
  children?: object[],
}

export const IconHeader = ({icon, children}:PropDefs) => {
  return (
    <h2>
      <FontAwesomeIcon icon={icon} transform="shrink-5"></FontAwesomeIcon>
      {children}
    </h2>
  )
}
