import { faHand } from "@fortawesome/free-regular-svg-icons";
import {
  faBan,
  faHandshake,
  faHandshakeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job, JobRequest } from "../../interfaces";
import { iconByStatus } from "../../shared";
import { ActionButton } from "../ActionButton";
import TinyProfile from "../TinyProfile";
import Stars from "../user/Stars";

interface PropDefs {
  job?: Job | null;
}

export const JobRequestDetails = ({ job }: PropDefs) => {
  const [t] = useTranslation();
  const currentUser = useCurrentUser();
  const amTaker = job?.taker?.id.toString() === currentUser?.id.toString();
  const amOwner = job?.owner.id.toString() === currentUser?.id.toString();
  const amApplicant = job?.job_requests.find((jr: JobRequest) => {
    return jr.candidate?.id.toString() === currentUser?.id.toString();
  });

  const selectContent = (): any => {
    if (amTaker) {
      // TODO: allow canceling
      return (
        <>
          <p>{t("jobs.cancel")}</p>
          <ActionButton
            title="cancel"
            variant="danger"
            icon={faHandshakeSlash}
          />
        </>
      );
    } else if (amOwner) {
      // TODO: when canceled, show accept to others
      // when available, show accept to everyone
      return job?.job_requests.map((jr: JobRequest) => {
        return (
          <div className="rowflex p-2 job-request-details" style={{justifyContent: 'space-between'}} key={jr.id}>
            <div className="rowflex">
              <TinyProfile user={jr.candidate} logoFirst={true}>
                <Stars average={jr.candidate.average_rating} />
              </TinyProfile>
            </div>
            {job?.taker && job?.taker?.id.toString() === jr?.candidate?.id.toString() ? (
              <ActionButton
                title="cancel"
                variant="danger"
                icon={faBan}
              />
            ):(
              <ActionButton title="accept" icon={faHandshake} />
            )}
          </div>
        );
      })
    } else if (amApplicant) {
      return (
        <ActionButton
          title="retract"
          className="danger"
          icon={faHandshakeSlash}
        />
      );
    } else if (job?.status === "available") {
      return <ActionButton title="apply" icon={faHand} />;
    }
    return null
  };

  return (
    <Row className="p-3">
      <Col>{selectContent()}</Col>
    </Row>
  );
};
