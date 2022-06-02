import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createJobListing } from "../../api/job_listings";
import CommonForm from "../CommonForm";
import ContentContainer from "../ContentContainer";
import { JobFormFields } from "../forms/JobFormFields";

export const JobListingEditor = () => {
  const [t] = useTranslation();

  return (
    <ContentContainer icon={faFileCirclePlus} title={t("new_listing")}>
      <CommonForm
        apiEndpoint={createJobListing}
        fieldsComponent={JobFormFields}
        translationScope="job"
        initialValues={{ smoker: false }}
      />
    </ContentContainer>
  );
};

export default JobListingEditor;
