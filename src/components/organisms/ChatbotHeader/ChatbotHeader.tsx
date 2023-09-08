import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/redux/store";
import { setSessionAttributes } from "../../../shared/redux/action";
import actionTypes from '../../../shared/types/actionTypes';
import { useSignalr } from "../../../shared/context/SignalRContext";
const { ChatMinimizeIcon,ChatBotClose,Button}=require('@sentaraui/optimahealth_web/dist');
const ChatbotHeader: React.FC<any> = () => {
  const signalrContext = useSignalr();
  const dispatch = useDispatch();
  const sessionReducer = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );
  const messagesReducer = useSelector(
    (state: RootState) => state.reducers.messagesReducer
  );
  const onClose = () => {
    const timerStarted = window.localStorage.getItem('timerstarted') != null && window.localStorage.getItem('timerstarted');

    if (timerStarted === "true"){
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL, false));
      signalrContext.clearTimeoutTrigger();
      signalrContext.postMessage("continuesession");
      signalrContext.postMessage("remove", { key: "timerstarted"});
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, ""));
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "endSessionModal"));
    } else if (sessionReducer.isEnded || sessionReducer.isSessionTransfer ) {
      signalrContext.postMessage("endsession");
    } else {
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "endSessionModal"));
    }
  }

  const onMinimize = () => {
    const timerstarted = window.localStorage.getItem('timerstarted') != null && window.localStorage.getItem("timerstarted");
    if (timerstarted === 'true') {
      signalrContext.postMessage("minimize", { "timerFlag": localStorage.getItem('timerstarted'), "unreadCount": localStorage.getItem('unreadCount') });
    } else {
      signalrContext.postMessage("minimize", { "unreadCount": localStorage.getItem('unreadCount') || "0" });
    }
  };
  
  return (
    <div className={"chat-bot-header-div mob_chat_header"}>
       <Button
          className="chat-bot-collapse-icon"
          data-testid={"minimize-button"}
          aria-label="Minimize"
          role="button"
          tabIndex={1}
          onClick={() => onMinimize()}>
         <ChatMinimizeIcon/>
        </Button>
        <div aria-label="Customer Care Healthbot" title={"Customer Care"} role="heading"  tabIndex={2}  className="chat-bot-inner-p redhat_semibold">Customer Care</div>
        <Button
          className={`chat-bot-close-icon ${messagesReducer.messages.length > 0 ? '' : 'btn_disabled' }`}
          role="button"
          data-testid={"close-button"}
          tabIndex={2}
          aria-label="Exit"
          onClick={() => onClose()}
        >
          <ChatBotClose/>
        </Button>
    </div>
  );
};
export default ChatbotHeader;
