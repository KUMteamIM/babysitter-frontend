import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "./ActionButton"

export const CreateJobButton = () => {
  const navigate = useNavigate()
  return <ActionButton icon={faFileCirclePlus} title="create_job" onClick={() => navigate('/jobs/new')} />
}

export default CreateJobButton