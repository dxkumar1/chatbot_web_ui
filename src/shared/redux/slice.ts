import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import { IActionCardProps } from "../../shared"; // NOSONAR
import { MesssageProps, SessionProps, RetryProps,SurveyProps } from "../types/interfaces";
const initialState: MesssageProps = {
  messages: [],
  count: 0,
};


const initialSession: SessionProps = {
  sessionId: "",
  modalType: "",
  isEnded: false,
  isTimedOut: false,
  shouldShowTimeoutMessage: false,
  isUserEndedSession: false,
  isAgentEndedSession: false,
  isAgentTyping: false,
  isBotEndedSession: false,
  isAgentConnected: false,
  isWaitingForAgent: false,
  isSessionTransfer: false,
  transferType: "",
  benefitPhone1800: "",
  showLoading:false,
  messageLoading:true,
  isAgentRequestCanceled: false,
  timeout:0,
  onFocus: false
};

const initialRetry: RetryProps = {
  errorMessage: {},
  count: 0,
  isError: false,
};


const surveyState: SurveyProps = {
  survey: [],
  surveyLink: '',
  error : '',
  surveyConfig:{},
  surveyUser:{},
  token:'',
  loading:false
};

const surveySlice = createSlice({
  name: "SURVEY_REDUCER",
  initialState: surveyState,
  reducers: {
    setSurvey: (state, action: PayloadAction<any>) => {
      return { ...state, ...{ count: action.payload } };
    },
    setSurveyLink: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    setSurveyError: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    setSurveyAttributes: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});




const messagesSlice = createSlice({
  name: "CHAT_MESSAGES_REDUCER",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MesssageProps>) => {
      const ids: any = new Set([...state.messages].map((d) => d.id));
      const lastMessageBy = Array.isArray(state.messages) && state.messages.length > 0 ? state.messages[state.messages.length-1].user : "";
      const lastMessageType = Array.isArray(state.messages) && state.messages.length > 0 ? state.messages[state.messages.length-1].type : "";
      let newMessageCount = state.count || 0;
      const filteredInputMessage = action.payload.messages.filter((d) => {
        const returnValue = !ids.has(d.id);
        ids.add(d.id);
        newMessageCount += returnValue ? 1 : 0;
        return returnValue;
      });
      filteredInputMessage[0].user = lastMessageBy !== "member" && 
        lastMessageType === "text" && 
        filteredInputMessage[0].user !== "member" && 
        filteredInputMessage[0].type === "text" ? "memberSecond" : filteredInputMessage[0].user;
      return {
        messages: [
          ...state.messages,
          ...filteredInputMessage,
        ],
        count: newMessageCount,
      };
    },

    setMessagesCount: (state, action: PayloadAction<any>) => {
      return { ...state, count: action.payload };
    },
    // initializeMessages: (state, action: PayloadAction<MesssageProps>) => {
    //   return { messages: [...action.payload.messages] };
    // },

    updateMessages: (state, action: PayloadAction<MesssageProps>) => {
      return { messages: [...action.payload.messages] };
    },
    updateRetryMessages: (state, action: PayloadAction<any>) => {
      return { messages: [...action.payload] };
    },

    updateMessageSelections: (state, action: PayloadAction<any>) => {
      state.messages.forEach((message: IActionCardProps) => {
        if (
          action.payload.userSelections &&
          action.payload.userSelections[message.messageId]
        ) {
          const selection = action.payload.userSelections[message.messageId];
          const returnValue = { ...message };
          returnValue.active = false;

          if (
            selection.selectionType &&
            selection.selectionType.toLocaleLowerCase() === "selection"
          ) {
            returnValue.buttons.forEach((button) => {
              button.selected = button.value === selection.selectedOption;
            });
          }
          return returnValue;
        } else {
          return message;
        }
      });
    },
    updateSentMessage: (state, action: PayloadAction<any>) => {
      state.messages.forEach((message: IActionCardProps) => {
        if (message.id === action.payload.message._id) {
          const returnValue = { ...message };
          returnValue.id = action.payload.message.id;
          returnValue.isRetry = false;
          returnValue.status = "delivered";
          returnValue.messageId = action.payload.message.id + "_0";
          return returnValue;
        } else {
          return message;
        }
      });
      return { messages: [...state.messages], count: 0 };
    },
    updateSentMessageError: (state, action: PayloadAction<any>) => {
      state.messages.forEach((message: IActionCardProps) => {
        if (message.id === action.payload.message._id) {
          const returnValue = { ...message };
          returnValue.isRetry = true;
          return returnValue;
        } else {
          return message;
        }
      });
      return { messages: [...state.messages], count: 0 };
    },

    // resetChat: () => {
    //   return { ...initialState };
    // },
  },
});

const sessionIdSlice = createSlice({
  name: "SESSION_REDUCER",
  initialState: initialSession,
  reducers: {
    setSession: (state, action: PayloadAction<SessionProps>) => {
      return { ...action.payload };
    },
    setSessionAttributes: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    setTimeout: (state, action: PayloadAction<any>) => {
      return { ...state, timeout: action.payload };
    },
    resetSession: () => {
      return { ...initialSession };
    },
  },
});

const retrySlice = createSlice({
  name: "RETRY_REDUCER",
  initialState: initialRetry,
  reducers: {
    setCount: (state, action: PayloadAction<any>) => {
      return { ...state, ...{ count: action.payload } };
    },
    setError: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    resetRetry: () => {
      return { ...initialRetry };
    },
  },
});
export const {
  setMessages,
  updateMessages,
  updateRetryMessages,
  updateMessageSelections,
  setMessagesCount,
  updateSentMessage,
  updateSentMessageError,
} = messagesSlice.actions;

export const { setSession, resetSession, setSessionAttributes,setTimeout } =
  sessionIdSlice.actions;

export const { setCount, setError, resetRetry } = retrySlice.actions;

export const { setSurvey, setSurveyLink, setSurveyError,setSurveyAttributes } = surveySlice.actions;

const reducers = combineReducers({
  sessionReducer: sessionIdSlice.reducer,
  messagesReducer: messagesSlice.reducer,
  retryReducer: retrySlice.reducer,
  surveyreducer : surveySlice.reducer
});

export default reducers;
