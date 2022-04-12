import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentContainer from "../ContentContainer";
import { faChild, faChildren, faMobilePhone, faPaperPlane, faStar } from "@fortawesome/free-solid-svg-icons";
import { DateDetails, Job } from "../../interfaces";
import { useApiResponse } from "../../custom_hooks/shared";
import CommonFieldList from "../CommonFieldList";
import { Col, Row } from "react-bootstrap";
import { displayDateDayMonth, displayDateMonthYear, displayHourMinute, getDisplayName, getJobDetails } from "../../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { ActionButton } from "../ActionButton";

interface PropDefs {
  job?: Job|null;
}

export const JobDetail = ({job}:PropDefs) => {
  const [t] = useTranslation()
  const [jobDetails, setJobDetails] = useState<DateDetails>()

  useEffect(() => {
    if(!job) return
    setJobDetails(getJobDetails(job))
  }, [job])

  if(!jobDetails) return null;


  return (
    <div className="job-detail p-3 rowflex">
      <div style={{width: '49%'}}>
        <div>
          <span className="small">{t('name')}</span>
          <h3>{getDisplayName(job?.owner)}</h3>
        </div>
        <div>
          <span className="small">{t('start_time')}</span>
          <h3>{displayHourMinute(jobDetails.start_time)}</h3>
        </div>
        <div>
          <span className="small">{t('end_time')}</span>
          <h3>{displayHourMinute(jobDetails.end_time)}</h3>
        </div>
        <div>
          <span className="small">{t('date')}</span>
          <h3>{displayDateDayMonth(jobDetails.start_time)}</h3>
        </div>
        <div>
          <span className="small">{t('kids')}</span>
          <h3>{jobDetails.total_kids}</h3>
        </div>
      </div>
      <div>
        <div>
          <span className="small">{t('address')}</span>
          <h3>{job?.location.street}<br />
          {job?.location.zip}{' '}
          {job?.location.city}</h3>
        </div>
        <div className="contact-buttons">
          <span className="small">{t('contact')}</span>
          <br />
          <ActionButton icon={faPaperPlane} />
          <ActionButton icon={faMobilePhone} />
          <ActionButton icon={faEnvelope} />
        </div>
        <div>
          <span className="small">{t('total_pay')}</span>
          <div className="pay_flag p-2">
            {jobDetails.hours}
            {jobDetails.minutes > 0 && `:${jobDetails?.minutes}`}
            x
            {job?.pay_rate} &euro;
            <h1>{jobDetails.total_pay} &euro;</h1>
          </div>
        </div>
      </div>
    </div>

  );
};
