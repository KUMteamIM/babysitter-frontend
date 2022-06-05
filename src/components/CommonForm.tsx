import PropTypes from "prop-types";
import { useFormik } from "formik";
import React, { useState, createElement, FormEvent } from "react";
import { Alert, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FormikErrorList } from "./FormikErrorList";
import CommonSpinner from "@lmu-med/ci-components/dist/components/CommonSpinner";
import { LabeledRow } from "./LabeledRow";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces";

const DEFAULT_INITIAL_VALUES = { first_name: "", last_name: "", email: "" };

interface PropDefs {
  validationSchema: any,
  apiEndpoint: Function,
  fieldsComponent: any,
  translationScope: string,
  initialValues?: object,
  resultOnly: boolean,
  children?: any,
  encType?: string,
  onUpdate?: Function,
}

/**
 * Reusable Component that pipes data from "fieldsComponent" prop to
 * defined "apiEndpoint" prop and shows API response.
 * Error handling is taken care of.
 * @param {validationSchema} | Yup validation schema object
 * @param {apiEndpoint} | Function to invoke when form is sent. Needs to return a promise. Formik values are passed to this
 * @param {fieldsComponent} | Component containing the form fields
 * @param {translationScope} | Translation key containing field names, i.e. event
 * @param {initialValues} | initial values for the form
 * @returns form
 */
export const CommonForm = ({
  validationSchema,
  apiEndpoint,
  fieldsComponent,
  translationScope,
  initialValues,
  resultOnly,
  children,
  encType,
  onUpdate,
}:PropDefs) => {
  const [t] = useTranslation();
  const [sending, setSending] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse|null>(null);

  const formik = useFormik({
    initialValues: initialValues || DEFAULT_INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setSending(true);
      apiEndpoint(values).then(onApiResult).catch(onApiResult);
    },
    validate: (val) => {
      if(onUpdate) onUpdate(val)
    }
  });

  const onApiResult = (response: AxiosResponse) => {
    setSending(false);

    if (!response.hasOwnProperty("request")) {
      console.log(response);
      return;
    }
    if (response.request.status === 409) {
      setApiResponse({
        status: 409,
        message: t(`${translationScope}.email_already_exists`),
      });
    } else if (response.request.status === 200) {
      setApiResponse({
        status: 200,
        message: t(`${translationScope}.success_text`),
      });
    } else {
      setApiResponse({
        status: 400,
        message: t("general_error"),
      });
    }
  };

  if (resultOnly && apiResponse && apiResponse.status === 200) {
    return (
      <div>
        <div>
          <p>{t(translationScope + ".success_text")}</p>
        </div>
      </div>
    );
  }

  const interceptSubmit = (event: FormEvent) => {
    console.log("why the fuck");
    event.preventDefault();
    // formik.handleSubmit()
  };

  const fields = createElement(fieldsComponent, { formik: formik });
  return (
    <div className="common-form form-group p-3">
      <div>
        <p>{t(translationScope + ".introduction_text")}</p>
      </div>

      <form encType={encType} onSubmit={interceptSubmit}>
        {fields}
        {children}
        <LabeledRow>
          <FormikErrorList errors={formik.errors} />
        </LabeledRow>

        {apiResponse && (
          <Alert
            className={`alert ${
              apiResponse?.status === 200 ? "success" : "danger"
            }`}
          >
            {apiResponse?.status || apiResponse?.errors || ""}
          </Alert>
        )}

        {sending ? (
          <CommonSpinner />
        ) : (
          <Button
            variant="primary"
            type="submit"
            disabled={Object.keys(formik.errors).length > 0}
          >
            {t(translationScope + ".submit")}
          </Button>
        )}
      </form>
    </div>
  );
};
CommonForm.defaultProps = {
  resultOnly: true,
};

CommonForm.propTypes = {
  apiEndpoint: PropTypes.func.isRequired,
  fieldsComponent: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  translationScope: PropTypes.string,
  validationSchema: PropTypes.object,
  resultOnly: PropTypes.bool,
};
export default CommonForm;
