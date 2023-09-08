import { useSelector } from "react-redux";
import { useSignalr } from "../../../shared/context/SignalRContext";
import store, { RootState } from "../../../shared/redux/store";
import { IButtonProps } from "../../../shared";
import "./RetryButton";
import {
  setCount,
  setMessages,
  updateRetryMessages,
} from "../../../shared/redux/slice";
import {
  ALTERNATIVELY,
  ALTERNATIVELYMOBILE,
  WE_ARE_UNABLE,
} from "../../../shared/utils/strings";
import moment from "moment";
import { useEffect } from "react";
import { isMobilePlatform } from "../../../shared/utils/helpers";
const {RetryIcon} =require('@sentaraui/optimahealth_web/dist');
const RetryButton: React.FC<IButtonProps> = ({ tabIndex }) => {
  const signalrContext = useSignalr();
  const retryReducer = useSelector(
    (state: RootState) => state.reducers.retryReducer
  );

  const messageReducer = useSelector(
    (state: RootState) => state.reducers.messagesReducer
  );

  const sessionReducer = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );


  const onClick = () => {
    const messages = messageReducer.messages.filter(
      (message) => message.id !== "errorMessageId"
    );
    store.dispatch(updateRetryMessages(messages));
    store.dispatch(setCount(retryReducer.count + 1));
    signalrContext.sendMessage(retryReducer.errorMessage);
  };

  const checkDisable = () => {
    return retryReducer.count >= 3;
  };

  useEffect(() => {
    if (checkDisable()) {
      store.dispatch(
        setMessages({
          messages: [
            {
              type: "text",
              id: "errorMessageId1",
              messageId: "messageId1",
              text: WE_ARE_UNABLE,
              title: WE_ARE_UNABLE,
              focus: false,
              date: +new Date(),
              dateString: moment().format("hh:mm A"),
              user: "system",
              status: "Not delivered",
              replyToId: "",
              replyToIdIndex: "",
              active: false,
              isRetry: true,
            },
          ],
        })
      );
      store.dispatch(
        setMessages({
          messages: [
            {
              type: "text",
              id: "errorMessageId2",
              messageId: "messageId2",
              text: isMobilePlatform() ? ALTERNATIVELYMOBILE : ALTERNATIVELY,
              title: isMobilePlatform() ? ALTERNATIVELYMOBILE : ALTERNATIVELY,
              focus: false,
              date: +new Date(),
              dateString: moment().format("hh:mm A"),
              user: "memberSecond",
              status: "Not delivered",
              replyToId: "",
              replyToIdIndex: "",
              active: false,
              isRetry: true,
            },
          ],
        })
      );
    }
  }, [retryReducer]);

  return (
    <>
      <button
        data-testid={"retry"}
        className={`${
          checkDisable() || sessionReducer.isSessionTransfer ||sessionReducer.isEnded ? "retryBtnClassDisabled" : "retryBtnClass"
        }`}
        title={"Retry"}
        onClick={onClick}
        tabIndex={tabIndex}
        role="button"
        aria-label="Retry"
        disabled={checkDisable() || sessionReducer.isSessionTransfer ||sessionReducer.isEnded}
      >
        <RetryIcon/>
        <span> Retry</span>
      </button>
    </>
  );
};
export default RetryButton;
