import React from "react";
import { JobsTable } from "./jobs/JobsTable";
import { useCurrentUser } from "../custom_hooks/user";
import { Favorites } from "./Favorites";
import { JobRequestIndex } from "./job_requests/JobRequestIndex";

export const Home = () => {
  const currentUser = useCurrentUser();

  if (currentUser?.type === "owner") {
    return (
      <>
        <JobsTable status="booked" />
        <JobsTable />
        <JobRequestIndex />
        <JobsTable status="complete" />
        <Favorites />
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
