import React, { FC, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MessageListEvent,
  IMessageListProps,
  MessageType,
} from "../../../shared";
import { RootState } from "../../../shared/redux/store";
import { useSignalr } from "../../../shared/context/SignalRContext";
//import useSound from "use-sound";
//import mySound from "../../../assets/sound.mp3";
import { DOWNLOAD_TRANSCRIPT_TIMER, LOADER_TIMER } from "../../../shared/utils/constants";
import { setSessionAttributes } from "../../../shared/redux/action";
import actionTypes from "../../../shared/types/actionTypes";
import { setMessagesCount } from "../../../shared/redux/slice";
//import smoothscroll from "smoothscroll-polyfill";
import { checkMobileBrowser, isMobilePlatform } from "../../../shared/utils/helpers";
import { MessageListComponent } from "../../molecules";

const MessageList: FC<IMessageListProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const signalrContext = useSignalr();
  const messageReducer = useSelector((state: RootState) => state.reducers.messagesReducer);
  const sessionReducer = useSelector((state: RootState) => state.reducers.sessionReducer);
  const sessionReducerCount = useSelector((state: RootState) => state.reducers.messagesReducer.count || 0);
  const messagesReducer = useSelector((state: RootState) => state.reducers.messagesReducer);

  const surveyReducer = useSelector((state: RootState) => state.reducers.surveyreducer);
  const messageRef = useRef<HTMLInputElement>(null);
  const bottomMessageRef = useRef<HTMLInputElement>(null);
  //const [playSound] = useSound(mySound, { volume: 0.7, interrupt: true });
  const [isLoading, setIsLoading] = useState(true);
  const [agentDisabled, setAgentDisabled] = useState(false);
  const [firstTime, setFirstTime ] = useState(false);

  useEffect(() => {
    if (messageReducer?.messages?.length > 0) {
     // playSound();
    }
  }, [messageReducer.messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "unreadCount", messagesReducer.messages.length > 5 ? sessionReducerCount.toString() : "0"
      );
    } else {
      dispatch(setMessagesCount(0));
    }
  }, [sessionReducerCount, messageReducer.messages, messagesReducer.messages.length, signalrContext, dispatch]);

  useEffect(() => {

const checkSession = sessionReducer?.onFocus && messageReducer?.messages?.length > 5
const refAvailable = messageRef && messageRef.current;
const bottomRef = bottomMessageRef && bottomMessageRef.current;

    if (checkSession &&  refAvailable) {
        const bottom =
          messageRef.current?.scrollHeight -
            messageRef.current?.clientHeight -
            messageRef.current?.scrollTop <
          1;
        if (!bottom) {
          messageRef.current?.scrollBy(0, 200);
        }
        if (typeof window !== undefined) {
          //smoothscroll.polyfill();
        }
    } else {
      bottomRef && bottomMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (messageReducer?.messages?.length > 0) {
      dispatch(
        setSessionAttributes(
          actionTypes.ActionSetSession.SET_MESSAGE_LOADING,
          false
        )
      );
      if(sessionReducer.modalType === "error") {
        dispatch(
          setSessionAttributes(
            actionTypes.ActionSetSession.SET_MODAL_TYPE,
            ""
          )
        );
      }
      setIsLoading(false);
    }
  }, [messagesReducer]);

  useEffect(() => {
    if (sessionReducer.isEnded) {
      dispatch(
        setSessionAttributes(
          actionTypes.ActionSetSession.SET_MESSAGE_LOADING,
          false
        )
      );
      setIsLoading(false);
    }
    const timer = setTimeout(() => {
      dispatch(
        setSessionAttributes(
          actionTypes.ActionSetSession.SET_MESSAGE_LOADING,
          false
        )
      );
      setIsLoading(false);
    }, LOADER_TIMER);
    return () => clearTimeout(timer);
  }, []);

  const onOpen: MessageListEvent = (item, index, event) => {
    if (props && props.onOpen instanceof Function) {
      props.onOpen(item, index, event);
    }
  };
  const onDownload: MessageListEvent = (item, index, event) => {
    if (props && props.onDownload instanceof Function) {
      props.onDownload(item, index, event);
    }
  };
  const onClick: MessageListEvent = (item, index, event) => {
    if (props && props.onClick instanceof Function) {
      props.onClick(item, index, event);
    }
  };

  const onSelect = (message: MessageType, value: string) => {
    try {
      signalrContext.sendMessage({
        type: "send",
        inputType: "message",
        inputActionType: "Selection",
        message: value,
        replyToId: message.messageId,
        replyToIdIndex: message.id,
      });
    } catch (err) {}
  };

  const updateMessageCount = () => {
    dispatch(setMessagesCount(0));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "unreadCount",  "0"
      );
    }
  };

  const onCancelLiveAgent = () => {
    signalrContext.cancelLiveAgent();
  };

  const exitSurvey = () => {
    dispatch(
      setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "")
    );
    signalrContext.postMessage("endsession");
  };

  const openSurveyModal = () => {
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_MODAL_TYPE,
        "survey"
      )
    );
  };
  useEffect(() => {
    setFirstTime(true)
  }, [])

  const browserType: string = checkMobileBrowser();
  const isMobileBrowser: boolean = isMobilePlatform();
  useEffect(() => {
    const onFocus = () => {
      const device =  (browserType.indexOf("Device") !== -1 || isMobileBrowser &&  browserType.indexOf("iOSChrome") === -1)
        if (!device) {
          dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_FOCUS,true));
        }
    };
    // User has switched away from the tab (AKA tab is hidden)
    const onBlur = () => {
    dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_FOCUS,false));
    };
      window.addEventListener("focus", onFocus);
      window.addEventListener("blur", onBlur);
    return () => {
        window.removeEventListener("focus", onFocus);
        window.removeEventListener("blur", onBlur);
    };
  }, [firstTime, sessionReducer?.onFocus]);

  const handleScroll = (e: any) => {
    const bottom =
      Math.abs(
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
      ) < 1;
    if (bottom) {
      dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_FOCUS,false));
      updateMessageCount();
    }
  };

  useEffect(() => {
    const timerShowId = setTimeout(() => setAgentDisabled(true), DOWNLOAD_TRANSCRIPT_TIMER);
    return () => {
      clearTimeout(timerShowId);
    };
  }, [agentDisabled]);

  return (
    <MessageListComponent
      handleScroll={handleScroll}
      messageRef={messageRef}
      sessionReducer={sessionReducer}
      isLoading={isLoading}
      messageReducer={messageReducer}
      onOpen={onOpen}
      onDownload={onDownload}
      onClick={onClick}
      onSelect={onSelect}
      sessionReducerCount={sessionReducerCount}
      messagesReducer={messagesReducer}
      updateMessageCount={updateMessageCount}
      onCancelLiveAgent={onCancelLiveAgent}
      exitSurvey={exitSurvey}
      openSurveyModal={openSurveyModal}
      bottomMessageRef={bottomMessageRef}
      agentDisabled={agentDisabled}
      setAgentDisabled={setAgentDisabled}
      surveyReducer={surveyReducer}
    />
  );
};

export default MessageList;
