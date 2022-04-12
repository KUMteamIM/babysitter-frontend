import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Form, FormSelect, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { JobStatus, RequestParams } from "../../interfaces";
import { ActionButton } from "../ActionButton";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface PropDefs {
  onChange: Function;
  reqParams?: RequestParams | null;
  withStatus?: boolean;
}

const JobStates: JobStatus[] = [
  "available",
  "booked",
  "draft",
  "invisble",
  "complete",
  "canceled",
];

export const JobFilter = ({
  reqParams,
  onChange,
  withStatus = false,
}: PropDefs) => {
  const [states, setStates] = useState<JobStatus[]>(JobStates);
  const [t] = useTranslation();

  const onstatuschange = (e: any) => {
    let ns: JobStatus[] = [...states];
    const wantedState: JobStatus = e.currentTarget.value;
    if (states.includes(wantedState)) {
      ns.splice(ns.indexOf(wantedState), 1);
    } else {
      ns.push(wantedState);
    }
    setStates(ns);
  };

  const [expand, setExpand] = useState(true);

  const onPeriodChange = (e: any): void => {
    let today: Date = new Date()
    let end_time: Date = new Date(today)
    today.setHours(0,0,0,0)
    switch (e.currentTarget.value) {
      case 'this_week':
        end_time = new Date(today)
        end_time.setDate(end_time.getDate() + 7)
        break;
      case 'this_month':
        end_time = new Date(today.getFullYear(), today.getMonth()+1, 0);
        break;
      case 'half_year':
        end_time = new Date(today.getFullYear(), today.getMonth()+6, 0);
        break;
      case 'this_year':
        end_time = new Date(today);
        end_time.setFullYear(end_time.getFullYear()+1)
        break;
      default:
        break;
    }
    onChange({end_time})
  };
  const onStartTimeChange = (val: any): void => {
    onChange({start_hour: val.currentTarget.value})
  };
  const onEndTimeChange = (val: any): void => {
    onChange({end_hour: val.currentTarget.value})
  };

  return (
    <div className="job-filters">
      {expand ? (
        <div className="p-2 details">
          <h5><FontAwesomeIcon icon={faSliders} />&nbsp;&nbsp;Filter</h5>

          {withStatus && (
            <Row>
              <Col sm={2}>
                <b>{t("job_status")}</b>
              </Col>
              <Col className="rowflex">
                {JobStates.map((state) => {
                  return (
                    <React.Fragment key={state}>
                      <input
                        type="checkbox"
                        id={state}
                        defaultChecked={states.includes(state)}
                        value={state}
                        onChange={onstatuschange}
                      />
                      <label htmlFor={state}>{t(`jobs.${state}`)}</label>
                    </React.Fragment>
                  );
                })}
              </Col>
            </Row>
          )}
          <Row>
            <Col sm={2}>
              <b>{t("date_time")}</b>
            </Col>
            <Col sm={10}>
              <div className="rowflex">
                {t("job_filters.period")}:{" "}
                <Form.Select name="period" aria-label="Date Time" onSelect={onPeriodChange}>
                  <option value="0"> {t("job_filters.all")}</option>
                  <option value="week"> {t("job_filters.this_week")}</option>
                  <option value="two_weeks">

                    {t("job_filters.next_two_weeks")}
                  </option>
                  <option value="month"> {t("job_filters.this_month")}</option>
                  <option value="half_year">
                    {t("job_filters.half_year")}
                  </option>
                  <option value="year"> {t("job_filters.this_year")}</option>
                </Form.Select>
              </div>
              <div>
                <div className="rowflex">
                  {t("job_filters.between")}:{" "}
                  <Form.Select name="start_hour" aria-label="Date Time" onChange={onStartTimeChange}>
                    {new Array(24).fill(1).map((entry, index) => {
                      return <option value={index}>{index}:00</option>;
                    })}
                  </Form.Select>
                  {" "}
                  {t("job_filters.and")}
                  {" "}
                  <Form.Select name="end_hour" aria-label="Date Time" onChange={onEndTimeChange}>
                    {new Array(24).fill(1).map((entry, index) => {
                      return <option value={index}>{index}:00</option>;
                    })}
                  </Form.Select>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionButton title="ok" onClick={() => setExpand(false)} />
            </Col>
          </Row>
        </div>
      ) : (
        <div onClick={() => setExpand(!expand)}>
          <FontAwesomeIcon icon={faSliders} /> {t("set_filters")}
        </div>
      )}
    </div>
  );
};
