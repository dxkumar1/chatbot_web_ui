import React from "react";

import { Link } from "../../../atoms";
import { Deductibles } from "../../../molecules";
import { MessageBoxType } from "../../../../shared";
import PlanDataCard from "../../PlanDataCard/PlanDataCard";
const{Claim,Member,ProgressBar }
= require('@sentaraui/optimahealth_web/dist');

const MessageBoxComponent: React.FC<MessageBoxType> = ({ ...props }) => {
  return (
    <>
      {props.type === "link" && <Link {...props} key={"link_" + props.id} />}
      {props.type === "claims" && (
        <Claim {...props} key={"claim_" + props.id} />
      )}
      {props.type === "member" && (
        <Member {...props} key={"member_" + props.id} />
      )}
      {props.type === "plan" && (
        <PlanDataCard {...props} key={"plan_" + props.id} />
      )}
      {props.type === "deductibles" && (
        <Deductibles {...props} key={"deduct_" + props.id} />
      )}
      {props.type === "progress" && (
        <ProgressBar {...props} key={"progress_" + props.id} />
      )}
    </>
  );
};

export default MessageBoxComponent;
