import React from "react";
import { useTranslation } from "react-i18next";
import { JobIndex } from "./jobs/JobIndex";
import { useCurrentUser } from "../custom_hooks/user";
import { Favorites } from "./Favorites";
import { JobDetail } from "./jobs/JobDetail";

export const Home = () => {
  const [t] = useTranslation();
  const currentUser = useCurrentUser();

  if (currentUser?.type == "owner") {
    return (
      <>
        <JobIndex status="booked" />
        <JobIndex status="requested" />
        <JobIndex />
        <Favorites />
      </>
    );
  } else {
    return (
      <>
        <JobDetail id={1} />
        <JobIndex status="booked" />
      </>
    );
  }
};
