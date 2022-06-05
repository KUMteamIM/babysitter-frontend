import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useApiResponse } from "../../custom_hooks/shared";
import { Job, JobStatus, RequestParams } from "../../interfaces";
import { getMonthByIndex } from "../../shared";
import { JobFilter } from "./JobFilter";
import JobTableRow from "./JobTableRow";
import "./jobs.scss";
import JobsContainer from "./JobsContainer";

interface PropDefs {
  status?: JobStatus;
  requestParams?: RequestParams;
}

export const JobsTable = ({ status, requestParams }: PropDefs) => {
  const [t] = useTranslation();
  const [reqParams, setReqParams] = useState<RequestParams | null>(null);
  const result = useApiResponse("jobs", "get", reqParams);
  const jobs = result[0] as Job[]

  useEffect(() => {
    let nrp: RequestParams = { limit: 8 };
    if (status) nrp.status = status;
    setReqParams(nrp);
  }, [status]);

  useEffect(() => {
    if(requestParams) setReqParams(requestParams);
  }, [requestParams]);

  const buildList = (): Array<any> => {
    if (jobs && jobs.length) {
      let lastMonth: Date = new Date("01-01-2000")
      return jobs
        .sort((a: Job, b: Job) => {
          return a.start_time > b.start_time ? -1 : 1;
        })
        .map((job: Job, index: number) => {
          let startDate: Date = new Date(job.start_time);
          const startMonth = startDate.getMonth();
          let monthInsert = null;
          if (startDate.getMonth() > lastMonth.getMonth() || startDate.getFullYear() > lastMonth.getFullYear()) {
            lastMonth = startDate;
            monthInsert = (
              <tr>
                <td colSpan={8} className="month-insert">
                  {getMonthByIndex(startMonth+1)} {startDate.getFullYear()}
                </td>
              </tr>
            );
          }
          return (
            <React.Fragment key={index}>
              {monthInsert}
              <JobTableRow job={job} />
            </React.Fragment>
          );
        });
    }
    return [];
  };

  const onFilterChange = (newParams:RequestParams):void => {
    setReqParams(newParams)
  }

  return (
    <JobsContainer result={result} status={status}>
      <JobFilter onChange={onFilterChange} reqParams={reqParams} withStatus={true} />
      <Table striped className="job-list">
        <thead>
          <tr>
            <th>{t('date')}</th>
            <th>{t('time')}</th>
            <th>{t('duration')}</th>
            <th>{t('kids')}</th>
            <th>{t('pay_rate')}</th>
            <th>{t('total_pay')}</th>
            <th>{t('requests')}</th>
          </tr>
        </thead>
        <tbody>{buildList()}</tbody>
      </Table>
    </JobsContainer>
  );
};
