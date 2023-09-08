import ActionTypes from "../types/actionTypes"
import { GetMessagesProps, GetDownloadTranscript, SessionProps, GetSurveyTokenAPI, GetSurveyLinkAPI} from '../types/interfaces';
export const getMessages = ({ messages }: GetMessagesProps) => (
    {
        type: ActionTypes.ActionGetMessages.GET_MESSAGES,
        payload: {
            messages
        }
    });



export const setSurveyAttributes = (type: string, value: any) => {
            let payload = {};
            switch (type) {
                case ActionTypes.ActionSetSurvey.SET_SURVEY_LINK:
                    payload = { surveyLink: value };
                    break;
                case ActionTypes.ActionSetSurvey.SET_SURVEY_TOKEN:
                    payload = { token: value };
                    break;
                case ActionTypes.ActionSetSurvey.SET_SURVEY_ERROR:
                    payload = { error: value };
                    break;

                case ActionTypes.ActionSetSurvey.SET_SURVEY_CONFIG:
                    payload = { surveyConfig: value };
                 break;
                case ActionTypes.ActionSetSurvey.SET_SURVEY_USER:
                    payload = { surveyUser: value };
                 break;
                case ActionTypes.ActionSetSurvey.SET_SURVEY_LOADING:
                    payload = { loading: value };
                 break;
            }
            return {
                type: ActionTypes.ActionSurveyLinkAPI.SET_SURVEY_ATTRIBUTES,
                payload
            }
        
    };
    

export const updateSentMessage = ( message: any) => (
    {
        type: ActionTypes.ActionGetMessages.SENT_MESSAGE,
        payload: {
            message
        }
    });
    
    export const updateSendMessageError = ( message: any) => (
        {
            type: ActionTypes.ActionGetMessages.SENT_MESSAGE_ERROR,
            payload: {
                message
            }
        });
        
    export const updateMessagesCount = ({ count }: GetMessagesProps) => (
    {
        type: ActionTypes.ActionGetMessages.GET_COUNT,
        payload: {
            count
        }
    });
export const setSession = (session: SessionProps) => ({
    type: ActionTypes.ActionSetSession.SET_SESSION,
    payload: { ...session }
});

export const setSessionAttributes = (type: string, value: any) => {
    let payload = {};
    switch (type) {
        case ActionTypes.ActionSetSession.SET_SESSION_ID:
            payload = { sessionId: value };
            break;
        case ActionTypes.ActionSetSession.SET_MODAL_TYPE:
            payload = { modalType: value };
            break;
        case ActionTypes.ActionSetSession.SET_SESSION_ENDED:
            payload = { isEnded: value };
            break;
        case ActionTypes.ActionSetSession.SET_TIMED_OUT:
            payload = { isTimedOut: value };
            break;
        case ActionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL:
            payload = { shouldShowTimeoutMessage: value };
            break;
        case ActionTypes.ActionSetSession.SET_SESSION_ENDED_BY_USER:
            payload = { isUserEndedSession: value };
            break;
        case ActionTypes.ActionSetSession.SET_SESSION_ENDED_BY_AGENT:
            payload = { isAgentEndedSession: value };
            break;
        case ActionTypes.ActionSetSession.SET_SESSION_ENDED_BY_BOT:
            payload = { isBotEndedSession: value };
            break;
        case ActionTypes.ActionSetSession.SET_WAITING_FOR_AGENT:
            payload = { isWaitingForAgent: value };
            break;
        case ActionTypes.ActionSetSession.SET_CONNECTED_WITH_AGENT:
            payload = { isAgentConnected: value };
            break;
        case ActionTypes.ActionSetSession.SET_AGENT_REQUEST_CANCELED:
            payload = { isAgentRequestCanceled: value };
            break;
        case ActionTypes.ActionSetSession.SET_SESSION_TRANSFER:
            payload = { isSessionTransfer: value };
            break;
        case ActionTypes.ActionSetSession.SET_TRANSFER_TYPE:
            payload = { transferType: value };
            break;
        case ActionTypes.ActionSetSession.SET_SHOW_AGENT_TYPING:
            payload = { isAgentTyping: value };
            break;
        case ActionTypes.ActionSetSession.SET_MESSAGE_LOADING:
            payload = { messageLoading: value };
            break;
        case ActionTypes.ActionSetSession.SET_FOCUS:
            payload = { onFocus: value };
            break;
        case ActionTypes.ActionSetSession.SET_TIMEOUT_SECONDS:
            payload = { timeout: value };
            break;

            case ActionTypes.ActionSetSession.SET_TIMEOUT_SECONDS:
                payload = { timeout: value };
                break;
    }
    return {
        type: ActionTypes.ActionSetSession.SET_SESSION_ATTRIBUTES,
        payload
    }

};

export const downloadTranscript = ({ API_URL, API_KEY, userId, sessionId, authToken, onSuccess }: GetDownloadTranscript) => ({
    type: ActionTypes.ActionDownloadTranscript.DOWNLOAD_MESSAGE,
    payload: {
        API_URL,
        API_KEY,
        userId,
        sessionId,
        authToken,
        onSuccess
    }
});


export const getSurveyToken = ({ API_URL, KEY, SECRET,API_KEY,authToken, onSuccess }: GetSurveyTokenAPI) => ({
    type: ActionTypes.ActionSurveyTokenAPI.SURVEY_TOKEN_API,
    payload: {
        API_URL,
        KEY,
        SECRET,
        API_KEY,
        authToken,
        onSuccess
    }
});

export const getSurveyLink = ({ API_URL, TOKEN,USER,URL,API_KEY, authToken, onSuccess }: GetSurveyLinkAPI) => ({
    type: ActionTypes.ActionSurveyLinkAPI.SURVEY_LINK_API,
    payload: {
        API_URL,
        URL,
        TOKEN,
        API_KEY,
        USER,
        authToken,
        onSuccess
    }
});


export const getSurveyEmail = ({ API_URL, TOKEN,USER,URL,API_KEY,  authToken,onSuccess }: GetSurveyLinkAPI) => ({
    type: ActionTypes.ActionSurveyLinkAPI.SURVEY_LINK_API,
    payload: {
        API_URL,
        URL,
        TOKEN,
        USER,
        API_KEY,
        authToken,
        onSuccess
    }
});


export const getSurveySearch = ({ API_URL, TOKEN,USER,URL, API_KEY, authToken,onSuccess,onFailure }: GetSurveyLinkAPI) => ({
    type: ActionTypes.ActionSurveyLinkAPI.SURVEY_SEARCH_API,
    payload: {
        API_URL,
        URL,
        TOKEN,
        USER,
        API_KEY,
        authToken,
        onSuccess,
        onFailure
    }
});









