
export interface MesssageProps {
    messages: any[];
    count?:number;
}
export interface RetryProps {  
    errorMessage: Object;
    count: number;
    isError:boolean;
    
}


export interface SurveyProps{
    survey: any[];
    surveyLink:any;
    error:any;
    surveyConfig:any;
    surveyUser:any;
    token:string;
    loading:boolean;
}


export interface SurveyType {
    SET_SURVEY_LINK: string;
    SET_SURVEY_ERROR: string;
    SET_SURVEY_TOKEN: string;
    SET_SURVEY: string;
    SET_SURVEY_CONFIG: string;
    SET_SURVEY_USER: string;
    SET_SURVEY_LOADING: string;
}
export interface GetMessagesType {
    GET_MESSAGES: string;
    GET_COUNT: string;
    SENT_MESSAGE: string;
    SENT_MESSAGE_ERROR: string;
}

export interface SendSessionType {
    SET_SESSION: string;
    SET_SESSION_ATTRIBUTES: string;
    SET_SESSION_ID: string;
    SET_MODAL_TYPE: string;
    SET_SESSION_ENDED: string;
    SET_SHOW_TIMEOUT_MODAL: string;
    SET_TIMED_OUT: string;
    SET_SESSION_ENDED_BY_USER: string;
    SET_SESSION_ENDED_BY_BOT: string;
    SET_SESSION_ENDED_BY_AGENT: string;
    SET_WAITING_FOR_AGENT: string;
    SET_AGENT_REQUEST_CANCELED: string;
    SET_CONNECTED_WITH_AGENT: string;
    SET_SESSION_TRANSFER: string;
    SET_TRANSFER_TYPE: string;
    SET_GLOBAL_PHONE_1800: string;
    SET_GLOBAL_PHONE_LOCAL: string;
    SET_SHOW_AGENT_TYPING: string;
    SET_SHOW_LOADING: string;
    SET_MESSAGE_LOADING: string;
    SET_TIMEOUT_SECONDS: string;

    SET_FOCUS:string;
}

export interface SendMessageType {
    SEND_MESSAGES: string;
}

export interface EndSessionType {
    END_SESSION: string;
}

export interface DownloadTranscript {  
    DOWNLOAD_MESSAGE: string;   
}

export interface SessionProps {
    sessionId: string;
    modalType: string;
    isEnded: boolean;
    shouldShowTimeoutMessage: boolean;
    isTimedOut: boolean;
    isUserEndedSession: boolean;
    isAgentEndedSession: boolean;
    isAgentTyping: boolean;
    isBotEndedSession: boolean;
    isWaitingForAgent: boolean;
    isAgentConnected: boolean;
    isAgentRequestCanceled: boolean;
    isSessionTransfer: boolean;
    transferType: string;
    benefitPhone1800: string;
    showLoading:boolean;
    messageLoading: boolean;
    onFocus: boolean;
    timeout:number;
}

export interface SessionPayloadProps {
    payload: SessionProps | any;
    type: string;
}




export interface SendMessagePayloadProps {
    payload: SendChatMesssageProps;
    type: string;
}

export interface SurveyPayloadProps {
    payload: SurveyType | any;
    type: string;
}

export interface surveyTokenAPI {  
    SURVEY_TOKEN_API: string;   
}

export interface surveyLinkAPI {  
    SURVEY_LINK_API: string;  
    SURVEY_SEARCH_API : string;  
    SET_SURVEY_ATTRIBUTES: string;  
}




export interface EndSessionPayloadProps {
    payload: SendChatMesssageProps;
    type: string;
}

export interface GetMessagesPayloadProps {
    payload: GetMessagesProps;
    type: string;
}

export interface GetMessagesProps {
   messages?: Object[];
   count?:number;
}

export interface GetDownloadTranscriptProps {
    payload: GetDownloadTranscript;
    type: string;
}

export interface GetDownloadTranscript {  
    API_URL: string;
    API_KEY: string;
    userId: string;
    sessionId: string;
    authToken: string;
    onSuccess: Function;
}

export interface GetSurveyTokenAPI {  
   API_URL: string;
   KEY: string;
    SECRET: string;
    API_KEY: string;
    authToken: string;
    onSuccess: Function;
    onFailure: Function;
}

export interface GetSurveyLinkAPI {  
     API_URL: string;
     URL:any;
     TOKEN: string;
     API_KEY: string;
     authToken: string;
     USER: Object;
     onSuccess: Function;
     onFailure: Function;
}

export interface GetSurveyLinkProps {
    payload: GetSurveyLinkAPI;
    type: string;
}

export interface GetSurveyTokenProps {
    payload: GetSurveyTokenAPI;
    type: string;
}


export interface MessagesProps {
    inputActionType?: string;
    inputType: string;
    message: string;
    replyToId?: string | number;
    replyToIdIndex?: string | number;
    id?: string | number;
    messageId?: string | number;
    sessionId: string;
    type: string;
    userId: string;
    userSessionId: string;
}

export interface SendChatMesssageProps {
    message: MessagesProps;
    onSuccess: Function;
}

export interface SendMesssageProps {
    payload: any;
    type: string;
}
