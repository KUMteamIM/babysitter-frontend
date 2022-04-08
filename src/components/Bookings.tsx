import React from "react";
import { JobIndex } from "./jobs/JobIndex";
import { useCurrentUser } from "../custom_hooks/user";
import { ActionButton } from "./ActionButton";
import { faFileCirclePlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const Bookings = () => {
  const currentUser = useCurrentUser();

  if (currentUser?.type === "owner") {
    return (
      <>
        <JobIndex status="booked" />
        <JobIndex status="complete" />
      </>
    );
  } else {
    return (
      <>
        <JobIndex status="booked" />
      </>
    );
  }
};
