import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useApiResponse } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job, JobRequest } from "../../interfaces";
import { iconByStatus } from "../../shared";
import ContentContainer from "../ContentContainer";
import JobItem from "../jobs/JobItem";
import JobTableRow from "../jobs/JobTableRow";
import { JobRequestHandler } from "./JobRequestHandler";

export const JobRequestIndex = () => {
  const [t] = useTranslation();
  const currentUser = useCurrentUser();

  const result = useApiResponse(`/job_requests`);

  const jobRequestAccordion = () => {
    const entries = result[0];
    if (!entries) {
      return;
    }
    return (
      <Accordion defaultActiveKey="0">
        {entries.map((job: Job, index: number): any => {
          return (
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>
                <JobItem job={job} />
              </Accordion.Header>
              <Accordion.Body>
                {job.job_requests?.map((jr: JobRequest) => <JobRequestHandler job={job} jr={jr} />)}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  };

  const jobRequestList = () => {
    const entries = result[0];
    if (!entries) {
      return;
    }
    return (
      <Table striped className="job-list">
        {entries.map((job: Job, index: number): any => {
          return <JobTableRow job={job} key={index.toString()} />;
        })}
      </Table>
    );
  };

  return (
    <ContentContainer
      result={result}
      title={t(`job_requests`)}
      icon={iconByStatus["requested"]}
    >
      {currentUser?.type === "owner" ? jobRequestAccordion() : jobRequestList()}
    </ContentContainer>
  );
};

export default JobRequestIndex;
