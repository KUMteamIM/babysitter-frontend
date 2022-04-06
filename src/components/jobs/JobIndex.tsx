import {
  faChild,
  faClipboardCheck,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { Link, useParams } from "react-router-dom";
import { JobDetail } from "./JobDetail";
import { loadJobs } from "../../api/jobs";

interface PropDefs {
  status: string;
}

const iconByStatus: any = {
  booked: faClipboardCheck,
  requested: faQuestionCircle,
  all: faChild,
};

export const JobIndex = ({ status }: PropDefs) => {
  const [t] = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    loadJobs({ status });
  }, []);

  return (
    <>
      {id && <JobDetail id={parseInt(id)} />}
      <ContentContainer
        title={t(`${status}_jobs`)}
        icon={iconByStatus[status]}
        link={<Link to="/jobs">{t("view_all")}</Link>}
      ></ContentContainer>
    </>
  );
};

JobIndex.defaultProps = {
  status: "all",
};
