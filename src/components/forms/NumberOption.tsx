import React from "react";
import { twoDigitString } from "../dateFunctions";

interface PropDefs {
  value: number;
  prependZero: boolean,
  selected?: boolean
}
export const NumberOption = ({ value, prependZero, selected }: PropDefs) => {
  const stringVal: string = prependZero ? twoDigitString(value) : value.toString()
  return (
    <option key={stringVal} value={value} selected={selected}>
      {stringVal}
    </option>
  );
};
NumberOption.defaultProps = {
  prependZero: true
}
export default NumberOption;
