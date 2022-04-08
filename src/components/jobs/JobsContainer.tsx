import React from "react";
import { JobStatus } from "../../interfaces";
import { iconByStatus, pathByStatus } from "../../shared";
import ContentContainer from "../ContentContainer";
import { useTranslation } from "react-i18next";

interface PropDefs {
  result?: any;
  status: JobStatus,
  children?: any
}

const JobsContainer = ({ result, status, children }: PropDefs) => {
  const [t] = useTranslation();
  return (
    <ContentContainer
        result={result}
        title={t(`${status}_jobs`)}
        icon={iconByStatus[status]}
        path={pathByStatus[status] || `/jobs/${status}`}
        className={status}
      >{children}</ContentContainer>
  );
};

JobsContainer.defaultProps = { status: 'available' };

export default JobsContainer;
