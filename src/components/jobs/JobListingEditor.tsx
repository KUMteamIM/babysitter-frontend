import { faEye, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useApiResponse, useJob } from "../../custom_hooks/shared";
import { useCurrentUser } from "../../custom_hooks/user";
import { Job } from "../../interfaces";
import { jobValidationSchema } from "../../validationSchemas";
import ContentContainer from "../ContentContainer";
import { JobFormFields } from "../forms/JobFormFields";
import { JobDetail } from "./JobDetail";
import CommonSpinner from "@lmu-med/ci-components/dist/components/CommonSpinner";
import { FormikErrorList } from "../FormikErrorList";

const initialJobValues: Job = {
  smoker: false,
  infant_count: 0,
  toddler_count: 0,
  school_age_count: 0,
  start_time: new Date(),
  end_time: new Date(),
  status: "draft",
  id: "0",
  has_pets: false,
  description: "",
  pay_rate: 15,
};

export const JobListingEditor = () => {
  const [t] = useTranslation();
  const user = useCurrentUser();
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
      // if(onUpdate) onUpdate(val)
      console.log("updating?");
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
      if (user) setJob({ ...initialJobValues, owner: user });
    }
  }, [id, user, result]);

  return (
    <>
      <ContentContainer
        icon={faFileCirclePlus}
        title={t("new_listing")}
        className="col-sm-6"
      >
        <div className=" form-group p-3">
          <JobFormFields formik={formik} />
        </div>
      </ContentContainer>
      <ContentContainer icon={faEye} title={t("preview")} className="col-sm-6">
        <JobDetail job={job} />
        <div className="p-3 rowflex align-end">
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
            </Button>
          )}
        </div>
      </ContentContainer>
    </>
  );
};

export default JobListingEditor;
