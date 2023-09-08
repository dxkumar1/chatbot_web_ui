import React, { Key } from "react";
import { IDeductibleProps } from "../../../shared/interfaces";
const { ProgressBar }=require('@sentaraui/optimahealth_web/dist');

const Deductibles = (props: IDeductibleProps) => {
  const { tabIndex = 0} = props;
  return (
    <div
      className="deductibes"
      data-testid="deductibles"
      role="contentinfo"
      tabIndex={tabIndex + 1}
      aria-label="Deductibles"
    >
      {props.items &&
        props.items.map((x: any, i: number) => (
          <ProgressBar tabIndex={tabIndex + 1} data-testid="ProgressBar" key={i as Key} {...x} />
        ))}
    </div>
  );
};
export default Deductibles;
