import {
  faCheck,
  faEye,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useJob } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job } from "../../interfaces";
import { jobValidationSchema } from "../../validationSchemas";
import ContentContainer from "../ContentContainer";
import { JobFormFields } from "../forms/JobFormFields";
import { JobDetail } from "./JobDetail";
import CommonSpinner from "@lmu-med/ci-components/dist/components/CommonSpinner";
import { FormikErrorList } from "../FormikErrorList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const today = new Date();
today.setHours(today.getHours() + 1, 0, 0, 0);

const initialJobValues: Job = {
  smoker: false,
  infant_count: 0,
  toddler_count: 0,
  school_age_count: 0,
  start_time: today,
  end_time: new Date(today.getTime() + 60 * 60 * 1000),
  status: "draft",
  id: "0",
  has_pets: false,
  description: "",
  pay_rate: 15,
};

export const JobListingEditor = () => {
  const [t] = useTranslation();
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [sending, setSending] = useState<boolean>(false);

  const [job, setJob] = useState<Job | null>(null);
  const [result] = useJob(
    id !== "new" && id !== undefined ? `/jobs/${id}` : ""
  );

  const formik = useFormik({
    initialValues: initialJobValues,
    validationSchema: jobValidationSchema(),
    enableReinitialize: true,
    onSubmit: (values) => {
      setSending(true);
      // apiEndpoint(values).then(onApiResult).catch(onApiResult);
    },
    validate: (val) => {
      setJob(val as Job);
    },
  });

  // const onUpdate = (values: object) => {
  //   const newJob:Job = values as Job
  //   if(user?.locations.length) {
  //     newJob.location = user?.locations[0] || { }
  //   }
  //   setJob(newJob)
  //   return true
  // }

  useEffect(() => {
    if (id !== "new") {
      if (result) setJob(result);
    } else {
      console.log('has user', currentUser)
      if (currentUser) {
        setJob({ ...initialJobValues, owner: currentUser });
        formik.setFieldValue("owner", currentUser)
      } else {
        console.log('missing user')
      }
    }
  }, [id, currentUser, result, formik]);

  return (
    <>
      <ContentContainer
        icon={faFileCirclePlus}
        title={t("new_listing")}
        className="col-sm-6"
      >
        <JobFormFields formik={formik} />
      </ContentContainer>
      {job && (
        <ContentContainer
          icon={faEye}
          title={t("preview")}
          className="col-sm-6"
        >
          <JobDetail job={job} />
          <div className="p-3">
            <FormikErrorList errors={formik.errors} />
            {sending ? (
              <CommonSpinner />
            ) : (
              <Button
                variant="primary"
                type="submit"
                disabled={Object.keys(formik.errors).length > 0}
              >
                {t("job.submit")}
                &nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            )}
          </div>
        </ContentContainer>
      )}
    </>
  );
};

export default JobListingEditor;
