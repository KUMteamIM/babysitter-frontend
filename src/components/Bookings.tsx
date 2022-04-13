import React from "react";
import { JobsTable } from "./jobs/JobsTable";
import { useCurrentUser } from "../custom_hooks/user";
import { ActionButton } from "./ActionButton";
import { faFileCirclePlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const Bookings = () => {
  const currentUser = useCurrentUser();

  if (currentUser?.type === "owner") {
    return (
      <>
        <JobsTable status="booked" />
        <JobsTable status="complete" />
      </>
    );
  } else {
    return (
      <>
        <JobsTable status="booked" />
      </>
    );
  }
};
