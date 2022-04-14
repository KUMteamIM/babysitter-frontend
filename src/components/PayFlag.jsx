import React from "react";

export const PayFlag = ({ jobDetails }) => {
  return (
    <div className="pay-flag p-2">
      {jobDetails.hours}
      {jobDetails.minutes > 0 && `:${jobDetails.minutes}`}x{jobDetails.pay_rate}{" "}
      &euro;
      <h1>{jobDetails.total_pay} &euro;</h1>
    </div>
  );
};
export default PayFlag;
