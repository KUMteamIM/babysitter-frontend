import React from "react";
import { JobIndex } from "./jobs/JobIndex";
import { useCurrentUser } from "../custom_hooks/user";
import { Favorites } from "./Favorites";
import { JobDetail } from "./jobs/JobDetail";
import { JobRequestIndex } from "./jobs/JobRequestIndex";

export const Home = () => {
  const currentUser = useCurrentUser();

  if (currentUser?.type === "owner") {
    return (
      <>
        <JobIndex status="booked" />
        <JobRequestIndex path="job_requests" />
        <JobIndex />
        <Favorites />
      </>
    );
  } else {
    return (
      <>
        <JobDetail id="" />
        <JobIndex status="booked" />
      </>
    );
  }
};
