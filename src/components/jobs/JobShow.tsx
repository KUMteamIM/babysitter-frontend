import { faChildren } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiResponse } from "../../custom_hooks/shared";
import { Job } from "../../interfaces";
import CommonFieldList from "../CommonFieldList";
import ContentContainer from "../ContentContainer";

export const JobShow = () => {
  const [job, setJob] = useState<Job|null>(null)
  const { id } = useParams()
  const result = useApiResponse(`/jobs/${id}`)

  useEffect(() => {
    console.log(result)
    if(result[0]) setJob(result[0].data)
  }, [result])

  return (
    <ContentContainer
      result={result}
      title={job?.description}
      icon={faChildren}
    >
      {job && (
        <CommonFieldList data={job} />

      )}
    </ContentContainer>
  );
};

export default JobShow;
