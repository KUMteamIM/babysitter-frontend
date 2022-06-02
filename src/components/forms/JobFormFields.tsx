import { useTranslation } from "react-i18next";
import { LabeledRow } from "../LabeledRow";
import React, { ChangeEvent, ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from "react-bootstrap";

interface PropDefs {
  formik: any;
  model: object;
}

const SHORT_FIELDS = [
  "infant_count",
  "toddler_count",
  "school_age_count",
  "pay_rate",
];

export const JobFormFields = ({ formik, model }: PropDefs) => {
  const [t] = useTranslation();

  const { values } = formik;
  const today = new Date();

  const checkboxChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    formik.setFieldValue(target.name, target.checked);
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          {t("job.description")}
          <br />
          <input
            defaultValue={values.description}
            name={"description"}
            className="form-control"
            onChange={formik.handleChange}
          />
        </Col>
        <Col sm={6}>
          {values.start_time}
          <DatePicker
            name="start_time"
            onChange={(value: Date) => {
              console.log(value);
              if (value <= values.end_time) {
                if (value >= today) {
                  formik.setFieldValue("start_time", value);
                }
              }
            }}
            dateFormat="dd.MM.yyyy"
            selected={values.start_time}
          />
          &nbsp;{t("until")}&nbsp;
          <DatePicker
            name="end_time"
            onChange={(value: Date) => {
              if (value >= values.start_time) {
                formik.setFieldValue("end_time", value);
              }
            }}
            dateFormat="dd.MM.yyyy"
            selected={values.end_time}
          />
        </Col>
      </Row>
      <Row>
        {SHORT_FIELDS.map((sf: string, inx: number): ReactElement => {
          return (
            <Col sm={3} key={sf}>
              <label htmlFor={sf}>{t("job." + sf)}</label>
              <input
                name={sf}
                onChange={formik.updateValue}
                value={values[sf]}
              />
            </Col>
          );
        })}

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
