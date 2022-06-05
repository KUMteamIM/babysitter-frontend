import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faMobilePhone,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "../../custom_hooks/shared";
import { Job, JobDetails, Location } from "../../interfaces";
import {
  displayDateDayMonth, displayHourMinute,
  getDisplayName,
  getJobDetails,
} from "../../shared";
import { ActionButton } from "../ActionButton";
import PayFlag from "../PayFlag";

interface PropDefs {
  job?: Job | null;
}

export const JobDetail = ({ job }: PropDefs) => {
  const [t] = useTranslation();
  const [jobDetails, setJobDetails] = useState<JobDetails|null>(null);
  const locationData = useLocation(job ? job.id : null)
  const location  = locationData[0] as Location

  useEffect(() => {
    if (!job) return;

    const njd: JobDetails = getJobDetails(job)
    setJobDetails(njd);
  }, [job]);

  if (!jobDetails) return null;

  return (
    <div className="job-detail p-3 rowflex">
      <div style={{ width: "49%" }}>
        <div>
          <span className="small">{t("date")}</span>
          <h3>{displayDateDayMonth(jobDetails.start_time)}</h3>
        </div>
        <div>
          <span className="small">
            {t("start_time")} - {t("end_time")}
          </span>
          <h3>
            {displayHourMinute(jobDetails.start_time)} -{" "}
            {displayHourMinute(jobDetails.end_time)}
            <br />
            {jobDetails.hours}h
            {jobDetails.minutes > 0 && `:${jobDetails.minutes}m`}
          </h3>
        </div>
        <div>
          <span className="small">{t("kids")}</span>
          <h3>{jobDetails.total_kids}</h3>
        </div>
        <div>
          <span className="small">{t("job.description")}</span>
          <p>{job?.description}</p>
        </div>
      </div>
      <div>
        <div>
          <span className="small">{t("name")}</span>
          <h3>{getDisplayName(job?.owner)}</h3>
        </div>
        {location && (
          <div>
            <span className="small">{t("address")}</span>
            <h3>
              {location.street}
              <br />
              {location.zip} {location.city}
            </h3>
          </div>
        )}
        <div className="contact-buttons">
          <span className="small">{t("contact")}</span>
          <br />
          <ActionButton icon={faPaperPlane} />
          <ActionButton icon={faMobilePhone} />
          <ActionButton icon={faEnvelope} />
        </div>
        <div>
          <span className="small">{t("total_pay")}</span>
          <PayFlag jobDetails={{ ...jobDetails, pay_rate: job?.pay_rate }} />
        </div>
      </div>
    </div>
  );
};
