import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { loadJob } from "../../api/jobs";
import { Job } from "../../interfaces";

interface PropDefs {
  id: number;
}

export const JobDetail = ({ id }: PropDefs) => {
  const [t] = useTranslation();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const response = loadJob(id);
    console.log(response);
    // setJob(response)
  }, [id]);

  return (
    <ContentContainer
      title={t("favorites")}
      icon={faStar}
      path="/favorites"
    ></ContentContainer>
  );
};
