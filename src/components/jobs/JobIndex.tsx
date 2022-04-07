
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { Link, useParams } from "react-router-dom";
import { JobDetail } from "./JobDetail";
import { loadJobs } from "../../api/jobs";
import {
  faChild,
  faClipboardCheck,
  faPaste,
} from "@fortawesome/free-solid-svg-icons";
import { useApiResponse } from "../../custom_hooks/shared";
import { Job } from "../../interfaces";
import JobListEntry from "./JobListEntry";

interface PropDefs {
  status: string;
}

interface RequestParams {
  id?: string
  status?: string
}

const iconByStatus: any = {
  booked: faClipboardCheck,
  requested: faPaste,
  available: faChild,
};

export const JobIndex = ({ status }: PropDefs) => {
  const [t] = useTranslation();
  const { id } = useParams();
  const [reqParams, setReqParams] = useState<RequestParams|null>(null)
  const result = useApiResponse('jobs', 'get', reqParams)

  useEffect(() => {
    let nrp: RequestParams = {}
    if(id) nrp.id = id
    if(status) nrp.status = status
    setReqParams(nrp)
  }, [id, status])

  const buildList = ():Array<typeof JobListEntry> => {
    if(result[0] && result[0].data.length) {
      return result[0].data.map((job: Job, index: number) => {
        return <JobListEntry job={job} key={index} />
      })
    }
    return []
  }

  return (
    <>
      <ContentContainer
        result={result}
        title={t(`${status}_jobs`)}
        icon={iconByStatus[status]}
        path={`/jobs/${status}`}
      >
        {buildList()}
      </ContentContainer>
    </>
  );
};

JobIndex.defaultProps = {
  status: "available",
};
