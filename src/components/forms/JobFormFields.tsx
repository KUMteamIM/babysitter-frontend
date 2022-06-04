import React, { ChangeEvent, ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../custom_hooks/user";
import { Location } from "../../interfaces";
import TimeRangePicker from "../common/TimeRangePicker";
import SelectCol from "./SelectCol";

interface PropDefs {
  formik: any;
}

const SHORT_FIELDS = ["infant_count", "toddler_count", "school_age_count"];

export const JobFormFields = ({ formik }: PropDefs) => {
  const [t] = useTranslation();
  const { values, setFieldValue } = formik;

  const user = useCurrentUser();

  const checkboxChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    formik.setFieldValue(target.name, target.checked);
  };

  const updateValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    formik.setFieldValue(target.name, target.value);
  };

  const updateNumericValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    formik.setFieldValue(target.name, parseInt(target.value));
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          {t("job.description")}
          <br />
          <textarea
            rows={4}
            defaultValue={values.description}
            name={"description"}
            className="form-control"
            onChange={formik.handleChange}
          />
          <br />
          <p>{t("job.location")}</p>
          <select
            name="location"
            onChange={updateValue}
            className="form-control"
          >
            {user?.locations?.map((loc: Location) => (
              <option value={loc.id}>
                {loc.street}, {loc.zip} {loc.city}
              </option>
            ))}
          </select>
        </Col>
        <Col sm={6}>
          <TimeRangePicker formik={formik} />
        </Col>
      </Row>
      <Row>
        {SHORT_FIELDS.map((sf: string, inx: number): ReactElement => {
          return <SelectCol updateValue={updateNumericValue} field={sf} key={inx} />;
        })}

        <SelectCol updateValue={updateNumericValue} field="pay_rate" max={100} />

        <Col sm={3}>
          <label htmlFor="smoker">Smoker</label>
          <input
            type="checkbox"
            name="smoker"
            onChange={checkboxChange}
            defaultChecked={values.smoker}
          />
        </Col>

        <Col sm={3}>
          <label htmlFor="has_pets">Haustiere</label>
          <input
            type="checkbox"
            name="has_pets"
            onChange={checkboxChange}
            defaultChecked={values.has_pets}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
