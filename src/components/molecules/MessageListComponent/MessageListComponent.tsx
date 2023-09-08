import Loader from "../../atoms/Loader/Loader";
import React from "react";
import MessageBox from "../MessageBox/MessageBox";
import {
  SESSION_TRANSFERED,
  SESSION_TRANSFERED_NEW,
} from "../../../shared/utils/strings";
import { AgentTyping } from "../../../components/atoms";
import CancelAgentButton from "../CancelAgentButton/CancelAgentButton";
import EndSession from "../EndSession/EndSession";
import { setSessionAttributes } from "../../../shared/redux/action";
import actionTypes from "../../../shared/types/actionTypes";
import { useDispatch } from "react-redux";
const { LoadingIcon }=require('@sentaraui/optimahealth_web/dist');


function MessageListComponent({ handleScroll, messageRef, sessionReducer, isLoading, messageReducer,
  props,
  onOpen,
  onDownload,
  onClick,
  onSelect,
  sessionReducerCount,
  messagesReducer,
  updateMessageCount,
  onCancelLiveAgent,
  exitSurvey,
  bottomMessageRef,
  agentDisabled,
  setAgentDisabled,
  surveyReducer,
}: any) {

  const dispatch = useDispatch();
  const classChanges = () => {
    if ( sessionReducer.transferType === "new" && sessionReducer.isSessionTransfer === true && sessionReducer.isEnded) {
      return "chat-message-container redhat_semibold chat-transfer-isended";
    }
    if (sessionReducer.transferType === "transfer" && sessionReducer.messageLoading) {
      return "chat-message-container redhat_semibold chat-message-transfer";
    }
    if (sessionReducer.isEnded) {
      return "chat-message-container redhat_semibold chat-message-end";
    }
    if (isLoading &&sessionReducer.modalType !== "sessionTransfer" && sessionReducer.modalType !== "errorPopup") {
      return "chat-message-container redhat_semibold loader_bg";
    } else if (messageReducer && messageReducer.messages.length > 0) {
      return "chat-message-container redhat_semibold msg_height";
    } else {
      return "chat-message-container redhat_semibold";
    }
  };
  const isMobile = typeof window !== "undefined";
  const reloadData = isMobile && window.localStorage.getItem("pageReload") === 'true' ? true : false;
  return (
    <>
      <div
        onScroll={handleScroll}
        ref={messageRef}
        data-testid="message_list"
        className={classChanges()}
      >
          <div className={reloadData ? "button_prompt_disabled" : "button_message_enabled"}>
        <>

        {surveyReducer.loading && <Loader />}
          {!sessionReducer.isEnded &&
            (!isLoading ? false : true) &&
            sessionReducer.modalType !== "sessionTransfer" &&
            sessionReducer.modalType !== "error" && <Loader />}
          {messageReducer.messages &&
            messageReducer.messages.map(
              (
                x: {
                  buttons: any;
                  id: React.Key;
                  user: string;
                },
                i: number
              ) => (
                <div
                    key={x.id}
                    className={reloadData && x.buttons && x.buttons.filter( (item: { disabled: boolean }) => item.disabled === true)
                        ? "button_prompt_disabled_btn"
                        : "button_prompt"
                    }
                  >
                <MessageBox
                  data-testid={"message-listid"}
                  key={x.id}
                  {...(x as any)}
                  onOpen={
                    props?.onOpen &&
                    ((e: React.MouseEvent<HTMLElement>) => onOpen(x, i, e))
                  }
                  onDownload={
                    props?.onDownload &&
                    ((e: React.MouseEvent<HTMLElement>) => onDownload(x, i, e))
                  }
                  onClick={
                    props?.onClick &&
                    ((e: React.MouseEvent<HTMLElement>) => onClick(x, i, e))
                  }
                  onSelect={(value: string) => onSelect(x, value)}
                  tabIndex={i * 10}
                  chatEnded={sessionReducer.isEnded || sessionReducer.isSessionTransfer}
                />
                </div>
              )
            )}
        </>
      </div>
        {sessionReducerCount > 0 &&
        sessionReducer?.onFocus &&
        messagesReducer.messages.length > 4 &&
        sessionReducer.modalType !== "sessionTransfer" ? (
          <button
            onClick={() => {
              messageRef?.current?.scrollIntoView({ behavior: "smooth" });
              dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_FOCUS,false));
              updateMessageCount();
            }}
            className="unread_message" role="alert"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width={10} height={12} viewBox="0 0 10 12" fill="none">
                <path
                  fillRule="evenodd" clipRule="evenodd"
                  d="M9.695 6.203a.7.7 0 010 .99l-4.2 4.2a.7.7 0 01-.99 0l-4.2-4.2a.7.7 0 01.99-.99L4.3 9.208v-8.11a.7.7 0 011.4 0v8.11l3.005-3.005a.7.7 0 01.99 0z"
                  fill="#262626"
                />
              </svg>
            </span>
            {/* {sessionReducerCount} unread messages */}
            New messages
          </button>
        ) : null}
        {sessionReducer.isWaitingForAgent &&
          !sessionReducer.isSessionTransfer && (
            <div
              className={
                !agentDisabled
                  ? "d_flex_center agent_disabled"
                  : "d_flex_center"
              }
            >
              <CancelAgentButton
                tabIndex={1}
                title={"Cancel live agent chat"}
                text={"Cancel live agent chat"}
                disabled={false}
                onClick={(e) => {
                  onCancelLiveAgent(e);
                  setAgentDisabled(false);
                }}
                key={"link_cancel_live_agent"}
              />
            </div>
          )}
        {sessionReducer.isSessionTransfer &&
          sessionReducer.transferType === "transfer" && (
            <>
              <div
                aria-label={SESSION_TRANSFERED}
                role="contentinfo"
                tabIndex={9997}
                className="session-transfer-message session-transfer-message-extra redhat_regular"
              >
                <i>{SESSION_TRANSFERED}</i>
              </div>
            </>
          )}
        {sessionReducer.isSessionTransfer &&
        sessionReducer.transferType === "new" ? (
          <div>
            <div
              aria-label={SESSION_TRANSFERED_NEW}
              role="contentinfo"
              tabIndex={9997}
              className="session-transfer-message session-transfer-message-extra redhat_regular"
            >
              <i>{SESSION_TRANSFERED_NEW}</i>
            </div>
          </div>
        ) : (
          <></>
        )}
               
        {(sessionReducer.modalType === "endSessionView" ||
          sessionReducer.isEnded) &&
          !sessionReducer.isSessionTransfer && (
            <EndSession
              onExit={exitSurvey}
              isTimedOut={sessionReducer.isTimedOut && !sessionReducer.isEnded ? true : false}
              isIdle={sessionReducer.isEnded && sessionReducer.isTimedOut ? true : false}
              surveyReducer={surveyReducer}
            />
          )}
        <div ref={bottomMessageRef} />
        {sessionReducer.isAgentTyping && !sessionReducer.isEnded && (
          <AgentTyping tabIndex={9995} />
        )}
        <div className="loadingIndicator">
          {sessionReducer.showLoading && <LoadingIcon tabIndex={9995} />}
        </div>



      </div>
     
    </>
  );
}

export default MessageListComponent;
