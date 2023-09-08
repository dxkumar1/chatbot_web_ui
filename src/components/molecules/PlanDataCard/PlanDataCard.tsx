import React from "react";
import { IPlanDataProps } from "../../../shared";
import { Label, Plan } from "../../atoms";

const PlanDataCard = (props: IPlanDataProps, tabIndex:number) => {
  return (
    <div className="plan-data" tabIndex={tabIndex + 1} role="contentinfo" aria-label="PlanDataCard">
      {props.generic && props.generic.length && (
        <Label text={"General In-Network Copays/Coinsurance"} tabIndex={tabIndex + 1}></Label>
      )}
      {props.generic && props.generic.length && <Plan data={props.generic} />}
      {props.discounted && (
        <Label text={"Discounted In-Network Copays/Coinsurance"} tabIndex={tabIndex + 1}></Label>
      )}
      {props.discounted && <Plan data={props.discounted} />}
    </div>
  );
};
export default PlanDataCard;
