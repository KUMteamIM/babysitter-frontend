import React from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { faChild, faChildren, faStar } from "@fortawesome/free-solid-svg-icons";
import { Job } from "../../interfaces";
import { useApiResponse } from "../../custom_hooks/shared";
import CommonFieldList from "../CommonFieldList";

interface PropDefs {
  id: string;
}

export const JobDetail = ({ id }: PropDefs) => {

  const result = useApiResponse(`/jobs/${id}`)

  return (
    <ContentContainer
      title={result[0].description || "..."}
      icon={faChild}
      result={result}
    >
      <CommonFieldList data={result[0]} />
    </ContentContainer>
  );
};
