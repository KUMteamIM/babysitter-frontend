import React from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { useApiResponse } from "../../custom_hooks/shared";

export const JobRequestIndex = () => {
  const [t] = useTranslation();

  const result = useApiResponse(`/job_requests`)

  // TODO when owner, group by job, by date
  // when taker, list requests
  return (
      <ContentContainer
        result={result}
        title={t(`job_requests`)}
        icon={faPaste}
      >

      </ContentContainer>
  );
};

export default JobRequestIndex