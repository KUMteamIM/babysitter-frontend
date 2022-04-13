import React from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { useApiResponse } from "../../custom_hooks/shared";
import { Accordion, AccordionButtonProps, Table } from "react-bootstrap";
import { Job, JobRequest } from "../../interfaces";
import { iconByStatus } from "../../shared";
import { JobFragment } from "../jobs/JobFragment";
import TinyProfile from "../TinyProfile";
import { useCurrentUser } from "../../custom_hooks/user";
import JobTableRow from "../jobs/JobTableRow";

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
                <JobFragment job={job} />
              </Accordion.Header>
              <Accordion.Body>
                <p>{t('requests_for_job')}</p>
                {job.job_requests.map((jr: JobRequest) => (
                  <TinyProfile user={jr.candidate} key={jr.candidate.id} />
                ))}
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
