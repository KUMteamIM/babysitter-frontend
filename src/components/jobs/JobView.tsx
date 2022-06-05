import { faEdit, faUserTag } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useJob, useUser } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job } from "../../interfaces";
import { iconByStatus } from "../../shared";
import { ActionButton } from "../ActionButton";
import ContentContainer from "../ContentContainer";
import { JobRequestDetails } from "../job_requests/JobRequestDetails";
import { UserDetails } from "../user/UserDetails";
import { JobDetail } from "./JobDetail";

export const JobView = () => {
  const { id } = useParams();
  const jobResult = useJob(id)
  const [job] = jobResult

  // TODO: when owner, show taker
  // TODO: when taker, show owner
  const [user] = useUser(job?.owner?.id);
  const [t] = useTranslation();
  const currentUser = useCurrentUser();

  // TODO: show taker details when currentUser === owner and status === booked
  const amOwner = job?.owner?.id.toString() === currentUser?.id.toString();

  // TODO: show "this is your job" above everything else when currentUser === taker

  return (
    <>
      {amOwner && (
        <div style={{ marginBottom: "-30px", marginTop: "-50px" }}>
          <ActionButton title="edit_job" variant="warning" icon={faEdit} />
        </div>
      )}
      <Col>
        <ContentContainer
          result={jobResult}
          title={t("listing")}
          icon={job && iconByStatus[job?.status]}
        >
          <JobDetail job={job} />
          <h4 className="p-3">{t("job_requests")}</h4>
          <JobRequestDetails job={job} />
        </ContentContainer>
      </Col>
      <Col>
        <ContentContainer title={t("offered_by")} icon={faUserTag}>
          {user && (
            <UserDetails user={user} />
          )}
        </ContentContainer>
      </Col>
    </>
  );
};

export default JobView;
