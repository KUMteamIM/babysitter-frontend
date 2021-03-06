import React, { ChangeEvent, ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../custom_hooks/user";
import { Location } from "../../interfaces";
import { getUserLocation } from "../../shared";
import TimeRangePicker from "../common/TimeRangePicker";
import SelectCol from "./SelectCol";

interface PropDefs {
  formik: any;
}

const SHORT_FIELDS = ["infant_count", "toddler_count", "school_age_count"];

export const JobFormFields = ({ formik }: PropDefs) => {
  const [t] = useTranslation();
  const { values, setFieldValue } = formik;

  const currentUser = useCurrentUser();

  const checkboxChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFieldValue(target.name, target.checked);
  };

  const updateValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFieldValue(target.name, target.value);
  };

  const updateNumericValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFieldValue(target.name, parseInt(target.value));
  };

  return (
    <div className="form-group p-3">
      <Row className="mb-3">
        <Col sm={6}>
          <b>{t("job.description")}</b><br/>
          <textarea
            rows={8}
            defaultValue={values.description}
            name={"description"}
            className="form-control"
            onChange={formik.handleChange}
          />
          <br />
          <b>{t("job.location")}</b><br/>
          <select
            name="location"
            onChange={updateValue}
            className="form-control mb-3"
            value={values.location}
          >
            {currentUser?.locations?.map((loc: Location) => (
              <option value={loc.id}>
                {loc.street}, {loc.zip} {loc.city}
              </option>
            ))}
          </select>
  
          <SelectCol updateValue={updateNumericValue} field="pay_rate" max={100} value={values.pay_rate} />

        </Col>
        <Col sm={6}>
          <TimeRangePicker formik={formik} />
        </Col>
      </Row>
      <Row className="mb-3">
        {SHORT_FIELDS.map((sf: string, inx: number): ReactElement => {
          return <SelectCol updateValue={updateNumericValue} field={sf} key={inx.toString()} value={values[sf]} />;
        })}
      </Row>
      <Row className="mb-3">
        <Col sm={3}>
          <b>
          <input
          id="smoker"
          type="checkbox"
          name="smoker"
          onChange={checkboxChange}
          defaultChecked={values.smoker}
          />
          <label htmlFor="smoker">Raucher</label>
          </b>
        </Col>

        <Col sm={3}>
          <b>
          <input
            id="has_pets"
            type="checkbox"
            name="has_pets"
            onChange={checkboxChange}
            defaultChecked={!!values.has_pets}
          />
          <label htmlFor="has_pets">Haustiere</label>
          </b>
        </Col>
      </Row>
    </div>
  );
};
