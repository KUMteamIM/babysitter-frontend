import React from "react";
import { JobStatus } from "../../interfaces";
import { iconByStatus, pathByStatus } from "../../shared";
import ContentContainer from "../ContentContainer";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../custom_hooks/user";

interface PropDefs {
  result?: any;
  status: JobStatus,
  children?: any
}

const JobsContainer = ({ result, status, children }: PropDefs) => {
  const [t] = useTranslation();
  const currentUser = useCurrentUser()

  const title = status === 'available' && currentUser?.type === 'owner' ? t('my_listings'): t(`${status}_jobs`)

  return (
    <ContentContainer
        result={result}
        title={title}
        icon={iconByStatus[status]}
        className={status}
      >{children}</ContentContainer>
  );
};

JobsContainer.defaultProps = { status: 'available' };

export default JobsContainer;
