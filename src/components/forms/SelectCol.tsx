import { numericOptions } from "../../shared";
import { Col } from "react-bootstrap";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import NumberOption from "./NumberOption";

interface PropDefs {
  field: string;
  updateValue: any; // TODO: proper signature for function
  max?: number;
  start?: number;
  value?: number
}

const SelectCol = ({ field, updateValue, start, max, value = 0 }: PropDefs) => {
  const [t] = useTranslation();

  return (
    <Col sm={3} key={field}>
      <b><label htmlFor={field}>{t("job." + field)}</label></b>
      <select
        name={field}
        className="form-control numbers"
        onChange={updateValue}
        value={value}
      >
        {numericOptions(start, max).map((nr: number) => (
          <NumberOption key={nr.toString()} value={nr} prependZero={false} />
        ))}
      </select>
    </Col>
  );
};

export default SelectCol;
