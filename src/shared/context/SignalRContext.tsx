
import { createContext, useContext, useEffect, useRef,useState } from "react";
import { BroadcastChannel, createLeaderElection} from "broadcast-channel";

import {
    DefaultHttpClient,
    HttpRequest,
    HubConnectionBuilder,
    HttpResponse,
    LogLevel
} from "@microsoft/signalr";
import { getMessages, setSessionAttributes, downloadTranscript, getSurveyLink, getSurveySearch, setSurveyAttributes, getSurveyEmail, getSurveyToken } from "../redux/action";
import store from "../redux/store";
import actionTypes from "../types/actionTypes";
import moment from "moment";
import { setError, setMessages } from "../../shared/redux/slice";
import { AGENT_SURVEY_ID, API_URLS, BOT_SURVEY_ID, DEFAULT_EMPTY_STRING, TIMEOUT_COUNTDOWN } from "../../shared/utils/constants";
  
const timerInterval = 2000;
let API_KEY: string;
let API_URL: string;
let memberId: string;
let userId: string;
let userSessionId: string;
let intervalHandlerId: NodeJS.Timer;
let agentTypingIndicator = false;
let isWaitingForAgent = false;
let isAgentConnected = false;
let skipResetTimer = false;
let hasPendingFetchRequest = false;
let optimaWebIdleTimeout: number;
let idleHandlerId: NodeJS.Timer;
let actionEndSession: string;
let dataEndSession: string;

const broadcastchannel = new BroadcastChannel("optima_bot");
const elector = createLeaderElection(broadcastchannel);

const dispatchMessage = (input: any) => {
    store.dispatch(setError({ errorMessage: input }));
    store.dispatch(
        setMessages({
            messages: [
                {
                    type: "text",
                    id: "errorMessageId",
                    messageId: "messageId",
                    text: input.message,
                    title: input.message,
                    focus: false,
                    date: +new Date(),
                    dateString: moment().format("hh:mm A"),
                    user: "member",
                    status: "Not delivered",
                    replyToId: "",
                    replyToIdIndex: "",
                    active: false,
                    isRetry: true,
                },
            ],
        })
    );
};

const socketInvoke = (socketConnection: any, action: string, data: any) => {
    socketConnection &&
        socketConnection.state === "Connected" &&
        socketConnection
            .invoke(action, {
                ...data,
                userId,
                userSessionId,
                sessionId: window.localStorage.getItem("sessionId"),
            })
            .catch((err: any) => {
                if (action === "send") {
                    dispatchMessage(data);
                }
            });
}

const endSessionUsingSocket = (socketConnection: any) => {
    broadcastchannel.postMessage({ type: "activity", action: "end" });
    resetAgentTypingAndCancelAgentActions();    
    socketInvoke(socketConnection, "end", { type: "end", inputType: "activity" });
};


const fetchMessageUsingSocket = (socketConnection: any) => {
    skipResetTimer = false;
    hasPendingFetchRequest = true;
    const timerstarted = window.localStorage.getItem("timerstarted");
    if(timerstarted !== 'true'){
    socketInvoke(socketConnection, "fetch", {});
    }
};


const sendMessageToSocket = (input: any, socketConnection: any, userId: string, userSessionId: string) => {
    if (socketConnection && socketConnection.state === "Connected") {
        skipResetTimer = false;
        clearTimer();
        socketInvoke(socketConnection, "send", input);
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_SHOW_LOADING,
                true
            )
        );
        // If the user is connected with agent and sent a message
        // Should be reset the typing indicator and preview so that it doesn't reflect wrong on the CSR side.
        if(isAgentConnected) {
            userTypingWithSocket(socketConnection, {
                type: "typing",
                inputType: "message",
                inputActionType: "manual",
                message: "",
              });
        }
    } else {
        dispatchMessage(input);
    }
};

const postMessage = (action: string, data: any) => {
    if(action==="endsession"){
try{
        store.dispatch(
            setSurveyAttributes(
                actionTypes.ActionSetSurvey.SET_SURVEY_LOADING,
                true
              )
          );
       
        actionEndSession = action;
        dataEndSession = data;

        TokenSearch();

            }catch(error){

                store.dispatch(
                    setSurveyAttributes(
                        actionTypes.ActionSetSurvey.SET_SURVEY_LOADING,
                        true
                      )
                  );
            }
    }else{
        postMessageUpdate(action,data)
}
};

const postMessageUpdate=(action: string, data: any)=>{

    if ((window as any).chatListener) {
        //for Android
        (window as any).chatListener.postMessage(
            JSON.stringify({ action, data })
        );
    } else {
        window.parent.postMessage(
            {
                action,
                data,
            },
            (document.location &&
                document.location.ancestorOrigins &&
                document.location.ancestorOrigins[0]) ||
            "*"
        );
    }
}

const onSendCompletedHandler = (socketConnection: any) => {
    if(!hasPendingFetchRequest) {
        clearTimer();
        fetchMessageUsingSocket(socketConnection);
    }    
};

const handleTimeoutTrigger = (socketConnection: any,data: any) => {
    clearTimer();
    const timerStarted = window.localStorage.getItem("timerstarted");
    const {timeoutInSeconds} = data;
    if (timerStarted === undefined || timerStarted === null) {
        window.localStorage.setItem("timerstarted", "true");
        postMessage("set", { key: "timerstarted", value: "true" });

        if(store.getState().reducers?.sessionReducer?.timeout === 0){
            store.dispatch(setSessionAttributes(
                actionTypes.ActionSetSession.SET_TIMEOUT_SECONDS,timeoutInSeconds));
            }
    
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL,
                true
            )
        );
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_MODAL_TYPE,
                "timeout"
            )
        );
   }
};

const resetTimers = (socketConnection: any) => {
    clearTimer();
    const timerstarted = window.localStorage.getItem("timerstarted");
    if(timerstarted === 'true'){
        postMessage("remove", { key: "timerstarted" });
        window.localStorage.removeItem("timerstarted");
    }
    intervalHandlerId = setTimeout(() => fetchMessageUsingSocket(socketConnection), timerInterval);
}
const onStart = (socketConnection: any) => { 


    console.log("-------------socketConnection----------------",socketConnection);


    window.localStorage.removeItem("timerstarted");
    window.localStorage.setItem("activeChatSession", "true");
};

const onInvalidSession = (socketConnection: any) => {
    window.localStorage.removeItem("sessionId");
    window.localStorage.removeItem("activeChatSession");
    resetTimers(socketConnection);
};

const onServiceError = (socketConnection: any) => {
    errorHandler();
    resetTimers(socketConnection);
};

const errorHandler = () => {
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_MODAL_TYPE,
            "error"
        )
    );
}

const clearTimer = () => clearTimeout(intervalHandlerId);

const handleTransferedSession = (socketConnection: any, response: any) => {
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_TRANSFER_TYPE,
            response.type
        )
    );
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_SESSION_TRANSFER,
            true
        )
    );
 
};

const waitingForAgentHandler = (socketConnection: any) => {
    if (!isWaitingForAgent && !isAgentConnected) {
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_WAITING_FOR_AGENT,
                true
            )
        );
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_CONNECTED_WITH_AGENT,
                false
            )
        );
        isWaitingForAgent = true;
        isAgentConnected = false;
    }
};

const agentCancelCompleteHandler = (socketConnection: any) => {

    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_WAITING_FOR_AGENT,
            false
        )
    );
    isWaitingForAgent = false;
    fetchMessageUsingSocket(socketConnection);
};

const liveAgentCanceledHandler= (socketConnection: any) => {
    skipResetTimer = true;
    clearTimer();
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_AGENT_REQUEST_CANCELED,
            true
        )
    );
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_CONNECTED_WITH_AGENT,
            false
        )
    );
    isWaitingForAgent = false;
    isAgentConnected = false;
};

const agentConnectedHandler = (socketConnection: any) => {
    
    if (!isAgentConnected) {
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_WAITING_FOR_AGENT,
                false
            )
        );
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_CONNECTED_WITH_AGENT,
                true
            )
        );
        isWaitingForAgent = false;
        isAgentConnected = true;
    }
};

const dispatchEndSessionHandler = (modalType: string = DEFAULT_EMPTY_STRING) => {
    store.dispatch(
        setSessionAttributes(actionTypes.ActionSetSession.SET_SESSION_ENDED, true)
    );
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_MODAL_TYPE,
            modalType
        )
    );
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL,
            false
        )
    );
};

const resetAgentTypingAndCancelAgentActions = () => {
    if(agentTypingIndicator) {
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_SHOW_AGENT_TYPING,
                false
            )
        );    
    }
    if(isWaitingForAgent) {
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_WAITING_FOR_AGENT,
                false
            )
        );        
    }
    agentTypingIndicator = false;
    isWaitingForAgent = false;
}

const endSessionHandler = (socketConnection: any) => {
    clearTimer();
    skipResetTimer = true;
    dispatchEndSessionHandler("endSessionView");
    endSessionUsingSocket(socketConnection);
    postMessage("closeEndPopup",{ key: "closeEndPopup" });
};

const endSessionAgentHandler = (socketConnection: any) => {
    dispatchEndSessionHandler("");
    resetAgentTypingAndCancelAgentActions();    
    endSessionUsingSocket(socketConnection);
};

const onChatEndTimer = (socketConnection: any) => {
    resetTimers(socketConnection);
    dispatchEndSessionHandler("");
    endSessionUsingSocket(socketConnection);
    store.dispatch(
        setSessionAttributes(actionTypes.ActionSetSession.SET_TIMED_OUT, true)
    );
};

const messageHandler = (socketConnection: any, response: any) => {

    const { messages, sessionId, count } = response;
    //wrapping with condition so that incase if there is a change in session id only then dispatch and send postmessage
    //otherwise for every fetch message its triggering this post message unnecessarily.
    if(!skipResetTimer) {
        resetTimers(socketConnection);
    } else {
        clearTimer();
    }
    hasPendingFetchRequest = false;
    if (sessionId !== null && sessionId !== undefined && window.localStorage.getItem("sessionId") !== null || window.localStorage.getItem("sessionId")!== sessionId) {
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_SESSION_ID,
                sessionId
            )
        );
        window.localStorage.setItem("sessionId", sessionId);
        window.localStorage.setItem("downloadSessionId", sessionId);
        postMessage("set", { key: "sessionId", value: sessionId });    
    }
    try {
        if (Array.isArray(messages) && messages.length > 0) {
            store.dispatch(getMessages({ messages, count }));
            broadcastchannel.postMessage({ type: "messages", messages });
        }
    } catch (error) {  
        errorHandler();
    }

    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_SHOW_LOADING,
            false
        )
    );
};

const handleSessionTransfer = (socketConnection: any) => {
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_MODAL_TYPE,
            "sessionTransfer"
        )
    );
};

const disconnectHandler = (socketConnection: any) => {
    stopConnection(socketConnection);
    onInvalidSession(socketConnection);
};

const stopConnection = (socketConnection: any) => {
    clearTimer();
    if (socketConnection) {
        socketConnection
            .stop()
            .then(() => { })
            .catch((err: any) => {
            });
    }
};

const cancelLiveAgentUsingSocket = (socketConnection: any) => {
    skipResetTimer = true;
    clearTimer();
    socketInvoke(socketConnection, "cancelAgent", { type: "cancel", inputType: "activity" });
};

const downloadTranscriptdata = () => {
    postMessage("downloadChat", { key: "downloadChat" });
    store.dispatch(
      downloadTranscript({
        API_URL,
        API_KEY,
        userId,
        sessionId: window.localStorage.getItem("downloadSessionId")?.toString() ?? "",
        authToken: userSessionId,
        onSuccess: () => {},
      })
    );
  };

const endSessionCompleteHandler = (socketConnection: any) => {
    skipResetTimer = true;
    clearTimer();
    postMessage("remove", { key: "timerstarted" });
    postMessage("remove", { key: "sessionId" });
    window.localStorage.removeItem("sessionId");
    window.localStorage.removeItem("activeTab");
    window.localStorage.removeItem("activeChatSession");
    window.localStorage.removeItem("timerstarted");
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL,
            false
        )
    );
    store.dispatch(
        setSessionAttributes(actionTypes.ActionSetSession.SET_SESSION_ENDED, true)
    );
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_MODAL_TYPE,
            "endSessionView"
        )
    );
    stopConnection(socketConnection);
    getSurvey();
};


const getSurvey=()=>{


const satmatrix = store.getState().reducers.surveyreducer;
  
store.dispatch(
    getSurveyLink({
      API_URL: API_URL,
      TOKEN: `${satmatrix.token}`,
      URL:API_URLS.SURVEY_LINK,
      API_KEY:API_KEY,
      authToken: userSessionId,
      USER: {
        "survey_id": isAgentConnected ? AGENT_SURVEY_ID : BOT_SURVEY_ID,
        "first_name": satmatrix?.surveyConfig?.firstName,
        "last_name": satmatrix?.surveyConfig?.lastName,
        "contact_id": Date.now(),
        "email": satmatrix?.surveyConfig?.email,
        "preferred_survey_medium": "RETURN_LINK"
      },
      onSuccess: onSuccessLink,
      onFailure: onFailure,
    })
  );
}

const onFailure = (data: any) => {
    stopLoadingSurvey();
  }
  const onSuccessLink = (data: any) => {
    if(data.link){
    store.dispatch(
      setSurveyAttributes(
        actionTypes.ActionSetSurvey.SET_SURVEY_LINK,
        data.link
      )
  );
}
}

  const TokenSearch = () => {
    try{
        const satmatrix = store.getState().reducers.surveyreducer;
if(satmatrix?.token === ''){
    stopLoadingSurvey();
}else{

    store.dispatch(
      getSurveySearch({
        API_URL: API_URL,
        TOKEN: `${satmatrix.token}`,
        URL:API_URLS.SURVEY_SEARCH,
        API_KEY:API_KEY,
        authToken: userSessionId,
        USER: {"fields": [
          "survey_response_received","invitation_sent_date" ],
              "filter": {
                  "AND": {
                      "filters": [
                          {
                              "field": "email",
                              "operator": "equals",
                              "value": satmatrix?.surveyConfig?.email
                          },          
                      ]
                  }
              }
          },
        onSuccess: onSuccessSearch,
        onFailure: onFailure,
      })
    );
}
    }catch(error){
        stopLoadingSurvey();
    }
  }



  const stopLoadingSurvey=()=>{

    store.dispatch(
        setSurveyAttributes(
            actionTypes.ActionSetSurvey.SET_SURVEY_LOADING,
            false
          )
      );

      postMessageUpdate(actionEndSession,dataEndSession);

  }

  const getSurveyEmails=()=>{
    stopLoadingSurvey();
const satmatrix = store.getState().reducers.surveyreducer;
    store.dispatch(
        getSurveyEmail({
            API_URL: API_URL,
            TOKEN: `${satmatrix.token}`,
          URL:API_URLS.SURVEY_EMAIL,
          API_KEY:API_KEY,
          authToken: userSessionId,
          USER: {
            "survey_id": isAgentConnected ? AGENT_SURVEY_ID : BOT_SURVEY_ID,
            "first_name": satmatrix?.surveyConfig?.firstName,
            "last_name": satmatrix?.surveyConfig?.lastName,
            "contact_id": Date.now(),
            "email": satmatrix?.surveyConfig?.email,
            "preferred_survey_medium": "Email"
          },
          onSuccess: onSuccessLink,
          onFailure: onFailure,
        })
      );
    }

  const onSuccessSearch = (data:any) => {
    if(data.data.length > 0){
    data?.data[data.data.length-1].survey_response_received === "N" ? getSurveyEmails(): stopLoadingSurvey();
    }else{
        stopLoadingSurvey();
    }
  }

const sessionTransferWithSocket = (socketConnection: any, response: string) => { 
    store.dispatch(
        setSessionAttributes(
            actionTypes.ActionSetSession.SET_TRANSFER_TYPE,
            response
        )
    );
    socketInvoke(socketConnection, "transfer", { "inputActionType": response });
};

const transferCompleteHandler = (socketConnection: any, response: any) => {
    store.dispatch(
        setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "")
    );
    messageHandler(socketConnection, response);
};

const agentTypingHandler = (typing: boolean) => {
    if (agentTypingIndicator !== typing) {
        store.dispatch(
            setSessionAttributes(
                actionTypes.ActionSetSession.SET_SHOW_AGENT_TYPING,
                typing
            )
        );
    }
    agentTypingIndicator = typing;
};

const getBearerToken = () => userSessionId;


const userTypingWithSocket = (socketConnection: any, input: any) => {
    socketInvoke(socketConnection, "typing", input);
};

const manageActiveInstance = (token: string, isActive: boolean) => {
    const instanceDetails = window.localStorage.getItem("activeTab");
    let parsedData: any;
    let dataKeys: string[] = [];
    if(!instanceDetails) {
        parsedData = {};
    } else {
        try {
            parsedData = JSON.parse(instanceDetails);
            dataKeys = Object.keys(parsedData);    
        } catch(ex) {
            parsedData = {};
            dataKeys = [];
        }
    }
    parsedData[token] = isActive;
    if(isActive) {
        dataKeys.forEach(key => {
            if(token !== key) {
                parsedData[key] = false;
            }
        })    
    }
    window.localStorage.setItem("activeTab", JSON.stringify(parsedData));
}

const isSingleIntanceOrLastActiveInstance = (token: string): boolean => {
    const instanceDetails = window.localStorage.getItem("activeTab");
    let parsedData: any;
    let dataKeys: string[] = [];
    if(instanceDetails) {
        try {
            parsedData = JSON.parse(instanceDetails);
        } catch(ex) {
            return false;
        }
        dataKeys = Object.keys(parsedData);
        return (dataKeys.length === 1) || (parsedData[token]);
    }
    return false;
}

export const SignalRContext = createContext(null as any);
export function SignalRProvider(props: any) {
    const [windowIsActive, setWindowIsActive] = useState(false);
    const ws = useRef({} as any);
    class CustomHttpClient extends DefaultHttpClient {
        constructor() {
            super(console);
        }
        public async send(request: HttpRequest): Promise<HttpResponse> {
            request.headers = {
                ...request.headers,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
                memberId,
                userId,
                "Ocp-Apim-Subscription-Key": API_KEY,
            };
            request.withCredentials = false;
            return super.send(request);
        }
    }
    const handleActivity = () => {
        setWindowIsActive(!document.hidden);
    };
    const userTyping = (input: any) => userTypingWithSocket(ws.current, input);
    const sendMessage = (input: any) => sendMessageToSocket(input, ws.current, userId, userSessionId);
    const endSession = () => endSessionUsingSocket(ws.current);
    const handleSessionTransferResponse = (data: any) => sessionTransferWithSocket(ws.current, data);

    const handler = (data: any) => {
        if (data) {
            if (data.type === "messages") {
                store.dispatch(
                    getMessages({ messages: data.messages, count: data.count })
                );
            } else if (data.type === "activity") {
                if (data.action === "end") {
                    dispatchEndSessionHandler("endSessionView");
                    endSessionCompleteHandler(ws.current);
                }
            }
        }
    };
    const cancelLiveAgent = () => {
        cancelLiveAgentUsingSocket(ws.current);
    }
    const clearTimeoutTrigger = () => {
        window.localStorage.removeItem("timerstarted");
        postMessage("remove", { key: "timerstarted" });
        if(isAgentConnected) {
            sendMessage({
                type: "send",
                inputType: "message",
                inputActionType: "manual",
                message: "Yes, I'm Here",
              });
        } else {
            userTyping({
                type: "typing",
                inputType: "message",
                inputActionType: "manual",
                message: "",
            });
    
        }
        resetTimers(ws.current);
    };

    useEffect(() => {
        if (windowIsActive === true) {
            resetTimers(ws.current);
            manageActiveInstance(elector.token, true);
            broadcastchannel.removeEventListener("message", handler);
            idleHandlerId = setTimeout(() => {
                postMessage("continuesession", {key: "idleTimercontinuesession"});
            },  optimaWebIdleTimeout - TIMEOUT_COUNTDOWN);
        } else if (windowIsActive === false) {
            setTimeout(()=> {
                if(!isSingleIntanceOrLastActiveInstance(elector.token)) {
                    clearTimer();
                    broadcastchannel.addEventListener("message", handler);    
                }    
            }, 1000);
        }
        return () => {
            clearTimeout(idleHandlerId);
        }
    }, [windowIsActive]);

    useEffect(() => {
      //  handleIncomingData(event.data && event.data.chatBotConfig), true);
handleIncomingData(props.botConfig);
        postMessage("initial", { value: "App loaded.." });
        if (elector) {
            elector.awaitLeadership().then(() => {
                manageActiveInstance(elector.token, true);
            });
        }
    }, [elector]);

    const handleIncomingData = (botConfig: any) => {
        console.log("---------handleIncomingData----2--------",botConfig)

    if (typeof botConfig !== "undefined") {

console.log("---------handleIncomingData------------",botConfig)

if (Object.keys(ws.current).length == 0) {
               memberId = botConfig.memberId;
                userId = botConfig.userId;
                userSessionId = botConfig.token;
                API_KEY = botConfig.subscriptionKey;
                API_URL = botConfig.apiUrl;
                optimaWebIdleTimeout = botConfig.sessionIdle

                console.log("------in if---handleIncomingData------------")

            //     memberId = "MjY5ODUwMSowMQ==";
            //     userId = "QmFrZXJfdGVzdA==";
            //     userSessionId = "7MXjr13MStuUuc0TzodeMqHzepk7";
            //    API_KEY = "ea8c672e5f61415ab590975f575f8d35";
            //     API_URL = "https://webapi.sentara.com/uat1/optimamember/v1/chat";

            //     memberId = "MDAxNTc3NVhVKjAx";
            //     userId = "Q2xhdWRpYV90ZXN0";
            //     userSessionId = "gzqWd0DCipYkZK4b5p03rowm74LO";
            //    API_KEY = "ea8c672e5f61415ab590975f575f8d35";
            //     API_URL = "https://webapi.sentara.com/uat1/optimamember/v1/chat";

                 initNegotiateCall();

         
            }

            store.dispatch(
                setSurveyAttributes(
                    actionTypes.ActionSetSurvey.SET_SURVEY_CONFIG,
                    botConfig
                  )
            );

            surveyData(botConfig)

            store.dispatch(setSessionAttributes(actionTypes.ActionSetSession.SET_FOCUS, botConfig?.focus||false));
            localStorage.setItem("sessionTimeout",botConfig?.sessionIdle);
            localStorage.setItem( "pageReload", botConfig?.pageReload );
            if (botConfig?.phone !== "null" && botConfig?.phone !== "undefined") {
                localStorage.setItem("global_phone_1800",botConfig?.phone?.benefitPhone1800);
                localStorage.setItem("global_phone_local",botConfig?.phone?.benefitPhoneLocal);
                store.dispatch(
                    setSessionAttributes(
                        actionTypes.ActionSetSession.SET_GLOBAL_PHONE_1800,
                        botConfig?.phone?.benefitPhone1800
                    )
                );
                store.dispatch(
                    setSessionAttributes(
                        actionTypes.ActionSetSession.SET_GLOBAL_PHONE_LOCAL,
                        botConfig.phone?.benefitPhoneLocal
                    )
                );
            }
       
    }
}


const surveyData=(botConfig:any)=>{
    store.dispatch(
        getSurveyToken({
          API_URL: API_URL,
          KEY: botConfig?.satmetrixKey,
          SECRET: botConfig?.satmetrixSecret,
          API_KEY:API_KEY,
          authToken: userSessionId,
          onSuccess: onSuccess,
          onFailure: onFailure,
        })
      );
    } 


  const onSuccess = (data: any) => {
    store.dispatch(
    setSurveyAttributes(
        actionTypes.ActionSetSurvey.SET_SURVEY_TOKEN,
        data.accessToken
      )
  );

  }

  const onFailure = (data: any) => {
  }
    const initNegotiateCall = () => {
        const connection = new HubConnectionBuilder()
            .withUrl(API_URL, {
                accessTokenFactory: getBearerToken,
                logMessageContent: true,
                httpClient: new CustomHttpClient(),
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Trace)
            .build();

        ws.current = connection;
        ws.current
            .start()
            .then(() => onStart(ws.current))
            .catch((err: any) => {
                store.dispatch(
                    setSessionAttributes(
                      actionTypes.ActionSetSession.SET_MESSAGE_LOADING,
                      false
                    )
                );
                const error = JSON.stringify(err);
                const parsedError = JSON.parse(error);
                if (parsedError.errorType === 'FailedToNegotiateWithServerError') {
                    postMessage('unauthorized', { value: true });
                } else {
                    errorHandler();
                }
             });

        ws.current.on("onMessage", (data: any) => messageHandler(ws.current, data));
        ws.current.on("disconnect", () => disconnectHandler(ws.current));
        ws.current.on("onConnectCompleted", () => fetchMessageUsingSocket(ws.current));
        ws.current.on("shouldSessionTransfer", () => handleSessionTransfer(ws.current));
        ws.current.on("sessionTransfered", (data: any) => handleTransferedSession(ws.current, data));
        ws.current.on("OnTransferComplete", (data: any) => transferCompleteHandler(ws.current, data));
        ws.current.on("onEndSessionComplete", () => endSessionCompleteHandler(ws.current));
        ws.current.on("onEndBotSession", () => endSessionHandler(ws.current));
        ws.current.on("onEndAgentSession", () => endSessionAgentHandler(ws.current));
        ws.current.on("onWaitingForAgent", () => waitingForAgentHandler(ws.current));
        ws.current.on("onAgentConnected", () => agentConnectedHandler(ws.current));
        ws.current.on("onCancelAgentComplete", () => agentCancelCompleteHandler(ws.current));
        ws.current.on("onLiveAgentCanceled", () => liveAgentCanceledHandler(ws.current));
        ws.current.on("onSendCompleted", () => onSendCompletedHandler(ws.current));
        ws.current.on("onInvalidSession", () => onInvalidSession(ws.current));
        ws.current.on("onServiceError", () => onServiceError(ws.current));
        ws.current.on("timeoutTrigger", (data: any) => handleTimeoutTrigger(ws.current,data));
        ws.current.on("AGENT_TYPING_STARTED", () => agentTypingHandler(true));
        ws.current.on("AGENT_TYPING_STOPPED", () => agentTypingHandler(false));
        ws.current.onclose(clearTimer);
        document.addEventListener("visibilitychange", handleActivity);
        return () => {
            document.removeEventListener("visibilitychange", handleActivity);
        };
    };

    return (
        <SignalRContext.Provider
            value={{
                sendMessage,
                endSession,
                clearTimer,
                cancelLiveAgent,
                userTyping,
                postMessage,
                handleSessionTransferResponse,
                onChatEndTimer,
                clearTimeoutTrigger,
                endSessionHandler,
                downloadTranscriptdata,
            }}
        >
            {props.children}
        </SignalRContext.Provider>
    );
}

export const useSignalr = () => useContext(SignalRContext);
