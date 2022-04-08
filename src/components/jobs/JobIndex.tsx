import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useApiResponse } from "../../custom_hooks/shared";
import { Job, JobStatus } from "../../interfaces";
import { getMonthByIndex, iconByStatus, pathByStatus } from "../../shared";
import ContentContainer from "../ContentContainer";
import JobListEntry from "./JobListEntry";
import "./jobs.scss";
import JobsContainer from "./JobsContainer";

interface PropDefs {
  status: JobStatus;
}

interface RequestParams {
  status?: JobStatus;
  limit?: number;
}

export const JobIndex = ({ status }: PropDefs) => {
  const [t] = useTranslation();
  const [reqParams, setReqParams] = useState<RequestParams | null>(null);
  const result = useApiResponse("jobs", "get", reqParams);

  useEffect(() => {
    let nrp: RequestParams = { limit: 8 };
    if (status) nrp.status = status;
    setReqParams(nrp);
  }, [status]);

  const buildList = (): Array<typeof JobListEntry> => {
    if (result[0] && result[0].length) {
      let lastMonth = new Date("01-01-2000").getMonth();
      return result[0]
        .sort((a: Job, b: Job) => {
          return a.start_time > b.start_time ? -1 : 1;
        })
        .map((job: Job, index: number) => {
          let startDate = new Date(job.start_time);
          const startMonth = startDate.getMonth();
          let monthInsert = null;
          if (startMonth > lastMonth) {
            lastMonth = startMonth;
            monthInsert = (
              <tr>
                <td colSpan={4} className="month-insert">
                  {getMonthByIndex(startMonth)} {startDate.getFullYear()}
                </td>
              </tr>
            );
          }
          return (
            <React.Fragment key={index}>
              {monthInsert}
              <JobListEntry job={job} />
            </React.Fragment>
          );
        });
    }
    return [];
  };

  return (
    <JobsContainer result={result} status={status || ""}>
      <Table striped className="job-list">
        <tbody>{buildList()}</tbody>
      </Table>
    </JobsContainer>
  );
};

JobIndex.defaultProps = {
  status: "available",
};
