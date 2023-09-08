import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AGENTP_CONNECT,
  SESSION_TRANSFER_TITLE,
  SESSION_TRANSFER_CONTENT,
  SESSION_TRANSFER_SUB_CONTENT1,
  SESSION_TRANSFER_SUB_CONTENT,
  TRANSFER_HERE,
  START_NEW_SESSION,
  AGENTP_CONNECT_LATER,
  DEFAULT_GLOBAL_PHONE,

} from "../../../shared/utils/strings";
import { ModalDialog } from "../../molecules";
import { RootState } from "../../../shared/redux/store";
import { useSignalr } from "../../../shared/context/SignalRContext";
import { setSessionAttributes } from "../../../shared/redux/action";
import actionTypes from '../../../shared/types/actionTypes';
import CallAgent from "../../molecules/CallAgent/CallAgent";
import { updateRetryMessages } from "../../../shared/redux/slice";
import { checkMobileBrowser, isMobilePlatform } from "../../../shared/utils/helpers";
import ModalPopupComponent from "../../molecules/ModalPopupComponent/ModalPopupComponent";

const Modals: React.FC<any> = () => {
  const signalrContext = useSignalr();
  const dispatch = useDispatch();

  let GLOBAL_PHONE_TOLLFREE = '';
  let AGENTP_CONNECT_LATER_UPDATED = AGENTP_CONNECT_LATER;
  let AGENTP_CONNECT_UPDATED = AGENTP_CONNECT;

  const browserType: string = checkMobileBrowser();
  const isMobileBrowser: boolean = isMobilePlatform();

  const isDesktopVersion = browserType.indexOf("iOSChrome") !== -1 ? true : !isMobileBrowser;
  const sessionReducer = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );

  const [isRetry, setIsRetry] = useState(true);
  const messageReducer = useSelector(
    (state: RootState) => state.reducers.messagesReducer
  );
  const retryReducer = useSelector(
    (state: RootState) => state.reducers.retryReducer
  );

  const sessionTransfer = (response: string) => {
    signalrContext.handleSessionTransferResponse(response);
  };

  const onContinueSession = () => {
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL,
        false
      )
    );
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_MODAL_TYPE,
        ""
      )
    );
    signalrContext.postMessage("continuesession");
    signalrContext.clearTimeoutTrigger();
  };

  const closeEndSession = () => {
    dispatch(
      setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "")
    );
  };

  const exitSurvey = () => {
    dispatch(
      setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "")
    );
    signalrContext.postMessage("endsession");
  };

  const CallLiveAgent = () => {

    if (!sessionReducer.isAgentConnected && browserType.indexOf("Device") !== -1) {
      signalrContext.postMessage(
        sessionReducer.isAgentConnected ? "callAgent" : "CallBot",
        {
          value:
            (typeof window !== "undefined" &&
              window.localStorage.getItem("global_phone_1800") != null &&
              window.localStorage.getItem("global_phone_1800")) ||
            "",
        }
      );
    }
  };

  if (
    typeof window !== "undefined" &&
    window.localStorage.getItem("global_phone_1800") != null
  ) {
    GLOBAL_PHONE_TOLLFREE = window.localStorage.getItem("global_phone_1800") ?? "";
    AGENTP_CONNECT_LATER_UPDATED = AGENTP_CONNECT_LATER.replace(
      DEFAULT_GLOBAL_PHONE,
      GLOBAL_PHONE_TOLLFREE || DEFAULT_GLOBAL_PHONE
    );
    AGENTP_CONNECT_UPDATED = AGENTP_CONNECT.replace(
      DEFAULT_GLOBAL_PHONE,
      GLOBAL_PHONE_TOLLFREE || DEFAULT_GLOBAL_PHONE
    );
  }


  const onRetry = () => {
    if (sessionReducer.sessionId === "") {
      signalrContext.postMessage("invalidsession");
    } else {
      setIsRetry(false);
      const messages = messageReducer.messages.filter(
        (message: any) => message.id !== "errorMessageId"
      );
      dispatch(updateRetryMessages(messages));
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, ""));
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_MESSAGE_LOADING, false));
      signalrContext.sendMessage(retryReducer.errorMessage);
    }
  }
  const onChatEnd = () => {
    closeEndSession();
    if (sessionReducer.modalType === "error" && sessionReducer.sessionId === "") {
      signalrContext.postMessage("errorPopupEndSession");
    } else {
      signalrContext.postMessage("closeEndPopup");
    }
    signalrContext.endSession();
  };

  const onChatEndTimer = () => {
    signalrContext.onChatEndTimer();
    onChatEnd();
  };
  return (
    <>
      <div data-testid="modal_component" className="modal_component redhat_semibold">

        <ModalPopupComponent 
          messageReducer={messageReducer}
          isRetry={isRetry} 
          GLOBAL_PHONE_TOLLFREE={GLOBAL_PHONE_TOLLFREE}
          closeEndSession={closeEndSession}
          onContinueSession={onContinueSession} 
          updateRetryMessages={updateRetryMessages}   
          messages={messageReducer?.messages}
          timeout={sessionReducer.timeout}
          isEnded={!sessionReducer.isEnded}
          messageLoading={!sessionReducer.messageLoading}
          shouldShowTimeoutMessage={sessionReducer?.shouldShowTimeoutMessage}
          modalType= {sessionReducer?.modalType}
          onRetry={onRetry}
          onChatEnd={onChatEnd}
          onChatEndTimer={onChatEndTimer}
          />

        {/* {sessionReducer.modalType === "survey" && (
          <div className="survey">
            <ModalDialog
              icon={<Survey />}
              title={SURVEY_TITLE}
              content={SURVEY_CONTENT}
              subContent={SURVEY_SUB_CONTENT}
              successTitle={SURVEY_BTN_SUBMIT}
              cancelTitle={SURVEY_BTN_CANCEL}
              onSuccess={closeEndSession}
              onClose={exitSurvey}
              modalType={"survey"}
            />
          </div>
        )} */}

        {sessionReducer.modalType === "CallAgent" && <CallAgent
          isAgentConnected={sessionReducer.isAgentConnected}
          GLOBAL_PHONE_TOLLFREE={GLOBAL_PHONE_TOLLFREE}
          CallLiveAgent={CallLiveAgent}
          closeEndSession={closeEndSession}
          AGENTP_CONNECT_LATER_UPDATED={AGENTP_CONNECT_LATER_UPDATED}
          AGENTP_CONNECT_UPDATED={AGENTP_CONNECT_UPDATED}
          isDesktopVersion={isDesktopVersion}

        />}

        {sessionReducer.modalType === "sessionTransfer" && (
          <ModalDialog
            title={SESSION_TRANSFER_TITLE}
            content={SESSION_TRANSFER_CONTENT}
            subContent={SESSION_TRANSFER_SUB_CONTENT}
            subContentOne={SESSION_TRANSFER_SUB_CONTENT1}
            successTitle={TRANSFER_HERE}
            cancelTitle={START_NEW_SESSION}
            onSuccess={() => sessionTransfer("transfer")}
            onClose={() => sessionTransfer("new")}
            modalType={"sessionTransfer"}
          />
        )}
      </div>
    </>
  );
};

export default Modals;
