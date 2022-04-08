import React from "react";
import { JobIndex } from "./jobs/JobIndex";
import { useCurrentUser } from "../custom_hooks/user";
import { Favorites } from "./Favorites";
import { JobRequestIndex } from "./job_requests/JobRequestIndex";

export const Home = () => {
  const currentUser = useCurrentUser();

  if (currentUser?.type === "owner") {
    return (
      <>
        <JobIndex status="booked" />
        <JobIndex />
        <JobRequestIndex />
        <JobIndex status="complete" />
        <Favorites />
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
