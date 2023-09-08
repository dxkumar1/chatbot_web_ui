import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/redux/store";
import { IChatbotFooterProps } from "../../../shared";
import { DownloadTranscript } from "../../atoms";
import { useSignalr } from "../../../shared/context/SignalRContext";
import { setSessionAttributes } from "../../../shared/redux/action";
import actionTypes from "../../../shared/types/actionTypes";
import { updateMessages } from "../../../shared/redux/slice";
import ChatbotInput from "../../molecules/ChatbotInput/ChatbotInput";
import { checkMobileBrowser, isMobilePlatform } from "../../../shared/utils/helpers";
const ChatbotFooter: React.FC<IChatbotFooterProps> = (device) => {
  const [input, setInput] = useState("");
  const typingIndicatorTimer = useRef(null as any);
  const notTypingIndicatorTimer = useRef(null as any);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const signalrContext = useSignalr();
  const dispatch = useDispatch();

  const sessionReducer = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );

  const messagesReducer = useSelector(
    (state: RootState) => state.reducers.messagesReducer
  );
  const browserType: string = checkMobileBrowser();
  const isMobileBrowser: boolean = isMobilePlatform();

  const sendUserTypingData = (value: string) => {
    signalrContext.userTyping({
      type: "typing",
      inputType: "message",
      inputActionType: "manual",
      message: value,
    });
  };

  const triggerTypingIndicator = () => {
    return setTimeout(() => {
      sendUserTypingData(input || " ");
    }, 500);
  };

  const triggerNotTypingIndicator = () => {
    return setTimeout(() => {
      typingIndicatorTimer.current = null;
      sendUserTypingData(input || "");
    }, 3000);
  };

  const clearTimeoutOnContinueSession = () => {
    const timerStarted =
      window.localStorage.getItem("timerstarted") != null &&
      window.localStorage.getItem("timerstarted");
    if (timerStarted === "true") {
      dispatch(
        setSessionAttributes(
          actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL,
          false
        )
      );
      signalrContext.clearTimeoutTrigger();
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeoutOnContinueSession();
    setInput(e.target.value.trimStart().replace(".", ""));
    if (!typingIndicatorTimer || !typingIndicatorTimer.current) {
      typingIndicatorTimer.current = triggerTypingIndicator();
    }
    if (notTypingIndicatorTimer && notTypingIndicatorTimer.current) {
      clearTimeout(notTypingIndicatorTimer.current);
    }
    notTypingIndicatorTimer.current = triggerNotTypingIndicator();
  }

  const onSendFooter = (input: string) => {
    if (input?.length > 0) {
      const messagesListFooter = [...messagesReducer.messages];
      if (messagesListFooter.length > 0) {
        const lastObject = messagesListFooter[messagesListFooter.length - 1];

        let updatedButtonsFooter = [];
        if (lastObject.type === "prompt") {
          updatedButtonsFooter = lastObject.buttons.map((button: any) => {
            return { ...button, disabled: true };
          });

          messagesListFooter[messagesListFooter.length - 1] = {
            ...lastObject,
            ...{ buttons: updatedButtonsFooter },
          };
        }
        dispatch(updateMessages({ messages: messagesListFooter }));
      }
      clearTimeout(notTypingIndicatorTimer.current);
      clearTimeout(typingIndicatorTimer.current);
      signalrContext.sendMessage({
        type: "send",
        inputType: "message",
        inputActionType: "manual",
        message: input,
      });
    }
  };

  const onCall = () => {
    clearTimeoutOnContinueSession();
    if (!sessionReducer.isAgentConnected && browserType.indexOf("Device") !== -1) {
      signalrContext.postMessage("CallBot", { value: formattedPhoneNumber });
    } else if (isMobileBrowser && !sessionReducer.isAgentConnected && browserType.indexOf("iOSChrome") === -1) {
      anchorRef.current?.click();
    } else {
      dispatch(
        setSessionAttributes(
          actionTypes.ActionSetSession.SET_MODAL_TYPE,
          "CallAgent"
        )
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFormattedPhoneNumber(window.localStorage.getItem("global_phone_1800") || "");
      setPhoneNumber(formattedPhoneNumber.replaceAll("+", "").replaceAll("-", "").replaceAll(" ", ""));
    }, 1000);
  })

  const retryReducer = useSelector(
    (state: RootState) => state.reducers.retryReducer
  );

  const checkDisable = () => {
    return retryReducer.count >= 3; // || messagesReducer.messages.length < 4; commenting out to validate whether it works fine as expected
  };

  return (
    <>
      <a href={"tel:" + phoneNumber} ref={anchorRef} target="_parent" style={{ "display": "none" }} aria-hidden="true">{formattedPhoneNumber}</a>
      {sessionReducer.isSessionTransfer &&
        sessionReducer.transferType === "transfer" && (
          <>
            <div className="chat-bot-footer-div-disabled">
              <>
                <ChatbotInput
                  onCall={onCall}
                  handleChange={handleChange}
                  input={input}
                  checkDisable={checkDisable}
                  onSend={onSendFooter}
                  setInput={setInput}
                />
              </>
            </div>
          </>
        )}

      {sessionReducer.isSessionTransfer &&
        sessionReducer.transferType === "new" && (
          <>
            <DownloadTranscript
              title="Download Chat Transcript"
              value="Download Chat Transcript"
              onClick={signalrContext.downloadTranscriptdata}
              keyRef={undefined}
              selected={false}
              type={""}
              disabled={false}
              tabIndex={9999}
              downloadTranscript={!sessionReducer.isTimedOut}
            />
          </>
        )}
      {!sessionReducer.isEnded && !sessionReducer.isSessionTransfer ? (
        <div
          className={`chat-bot-footer-div ${sessionReducer.messageLoading || (sessionReducer.modalType !== "" || sessionReducer.shouldShowTimeoutMessage)
              ? "btn_disabled"
              : ""
            }`}
        >
          <div>
            <ChatbotInput
              onCall={onCall}
              handleChange={handleChange}
              input={input}
              checkDisable={checkDisable}
              onSend={onSendFooter}
              setInput={setInput}
            />
          </div>
        </div>
      ) : (
        !sessionReducer.isSessionTransfer &&
        (sessionReducer.isEnded || sessionReducer.isTimedOut) && (
          <div>
            <DownloadTranscript
              title="Download Chat Transcript"
              value="Download Chat Transcript"
              onClick={signalrContext.downloadTranscriptdata}
              keyRef={undefined}
              selected={false}
              type={""}
              disabled={false}
              tabIndex={9999}
              downloadTranscript={sessionReducer.isTimedOut}
            />
          </div>
        )
      )}
    </>
  );
};
export default ChatbotFooter;
