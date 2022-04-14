import {
  faBan,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Job, JobRequest } from "../../interfaces";
import { ActionButton } from "../ActionButton";
import TinyProfile from "../TinyProfile";
import Stars from "../user/Stars";

interface PropDefs {
  jr:JobRequest
  job:Job
}
export const JobRequestHandler = ({jr, job}:PropDefs) => {
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
  )
}