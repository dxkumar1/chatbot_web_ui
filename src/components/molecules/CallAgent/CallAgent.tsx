import React from "react";
import {
  AGENT_CALL_CANCEL,
  AGENT_NUMBER,
  AGENT_NUMBER_CALL,
} from "../../../shared/utils/strings";
import ModalDialog from "../ModalDialog/ModalDialog";

function CallAgent({
  isAgentConnected,
  GLOBAL_PHONE_TOLLFREE,
  CallLiveAgent,
  closeEndSession,
  AGENTP_CONNECT_LATER_UPDATED,
  AGENTP_CONNECT_UPDATED,
  isDesktopVersion,
}: any) {
  return (
    <>
      <div data-testid="call__agent">
        {!isDesktopVersion && (
          <ModalDialog
            content={
              isAgentConnected
                ? AGENTP_CONNECT_LATER_UPDATED
                : AGENTP_CONNECT_UPDATED
            }
            successTitle={AGENT_NUMBER_CALL.replace(
              AGENT_NUMBER,
              GLOBAL_PHONE_TOLLFREE || AGENT_NUMBER
            )}
            cancelTitle={AGENT_CALL_CANCEL}
            onSuccess={CallLiveAgent}
            onClose={closeEndSession}
            AgentConnect={isAgentConnected}
            modalType={"CallAgent"}
          />
        )}

        {isDesktopVersion && (
          <ModalDialog
            content={
              isAgentConnected
                ? AGENTP_CONNECT_LATER_UPDATED
                : AGENTP_CONNECT_UPDATED
            }
            onClose={closeEndSession}
            callModal={true}
            modalType={"CallAgent"}
          />
        )}
      </div>
    </>
  );
}

export default CallAgent;
