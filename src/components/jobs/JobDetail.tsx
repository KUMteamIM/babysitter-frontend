import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { Link } from "react-router-dom";
import { faChildren, faStar } from "@fortawesome/free-solid-svg-icons";
import { loadJob } from "../../api/jobs";
import { Job } from "../../interfaces";

interface PropDefs {
  id: string;
}

export const JobDetail = ({ id }: PropDefs) => {
  return (
    <ContentContainer
      title="Job Title"
      icon={faChildren}
    >

Job-Detail

    </ContentContainer>
  );
};
