import React from "react";
import { CONNECTION_LIVE_AGENT } from "../../../shared/utils/strings";
const {
  ConnectingAgentIcon
} = require('@sentaraui/optimahealth_web/dist');

const ConnectingAgentText = () => {
  return (
    <div role={"contentinfo"} aria-label={CONNECTION_LIVE_AGENT} tabIndex={0} data-testid="connect_agent_text" className="ConnectAgentText">
      <div className="connectingmsg"><i>{CONNECTION_LIVE_AGENT}</i></div>
      <div className="connecticon">
 <ConnectingAgentIcon/>
      </div>
    </div>
  );
};

export default ConnectingAgentText;
