import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { Link, useParams } from "react-router-dom";
import { loadJobRequests, loadJobs } from "../../api/jobs";
import { faPaste } from "@fortawesome/free-solid-svg-icons";

interface PropDefs {
  path?: string
}
export const JobRequestIndex = ({path}:PropDefs) => {
  const [t] = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    loadJobRequests()
  }, []);

  return (
      <ContentContainer
        title={t(`job_requests`)}
        icon={faPaste}
        path={path}
      ></ContentContainer>
  );
};
