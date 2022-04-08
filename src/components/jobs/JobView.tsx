import { faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiResponse } from "../../custom_hooks/shared";
import { Job } from "../../interfaces";
import { iconByStatus } from "../../shared";
import CommonFieldList from "../CommonFieldList";
import ContentContainer from "../ContentContainer";

export const JobView = () => {
  const [job, setJob] = useState<Job|null>(null)
  const { id } = useParams()
  const result = useApiResponse(`/jobs/${id}`)

  useEffect(() => {
    if(result[0]) setJob(result[0])
  }, [result])

  return (
    <>
      <ContentContainer
        result={result}
        title={job?.description}
        icon={job && iconByStatus[job?.status]}
      >
        {job && (
          <CommonFieldList data={job} />
        )}
      </ContentContainer>

      <ContentContainer title="Profil des Anbieters" icon={faUserAlt}>
        hi
      </ContentContainer>
    </>
  );
};

export default JobView;
