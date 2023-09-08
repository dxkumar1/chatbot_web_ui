//import ApiService from "../utils/ApiService";
import { put, call, takeEvery } from "redux-saga/effects";
import {
  setMessages,
  setSessionAttributes,
  setSession,
  updateMessageSelections,
  updateSentMessage,
  updateSentMessageError,
  setSurveyAttributes 
} from "./slice";
import ActionTypes from "../types/actionTypes";
import {
  SessionPayloadProps,
  GetMessagesPayloadProps,
  GetDownloadTranscriptProps,
  SendMesssageProps,
  GetSurveyLinkProps,
  GetSurveyTokenProps,
} from "../types/interfaces";
import { parseMessage } from "../utils/helpers";
import { API_URLS } from "../utils/constants";

export function* MessagesWatcher() {
  yield takeEvery(ActionTypes.ActionGetMessages.GET_MESSAGES, MessagesWorker);
}

export function* MessagesWorker(action: GetMessagesPayloadProps) {
  try {
    const { messages, userSelections } = parseMessage(action.payload.messages);
    yield put(setMessages({ messages }));
    if (userSelections && Object.keys(userSelections).length > 0) {
      yield put(updateMessageSelections({ messages }));
    }
  } catch (err) {}
}

export function* SendMessageWatcher() {
  yield takeEvery(
    ActionTypes.ActionGetMessages.SENT_MESSAGE,
    SendMessageWorker
  );
}

export function* SendMessageWorker(action: SendMesssageProps) {
  yield put(updateSentMessage(action.payload));
}

export function* SendMessageErrorWatcher() {
  yield takeEvery(
    ActionTypes.ActionGetMessages.SENT_MESSAGE_ERROR,
    SendMessageErrorWorker
  );
}

export function* SendMessageErrorWorker(action: SendMesssageProps) {
  yield put(updateSentMessageError(action.payload));
}

export function* SessionWatcher() {
  yield takeEvery(ActionTypes.ActionSetSession.SET_SESSION, SessionWorker);
}

export function* SessionWorker(action: SessionPayloadProps) {
  try {
    yield put(setSession({ ...action.payload }));
  } catch (err) {}
}

export function* SessionAttributesWatcher() {
  yield takeEvery(
    ActionTypes.ActionSetSession.SET_SESSION_ATTRIBUTES,
    SessionAttributesWorker
  );
}

export function* SessionAttributesWorker(action: SessionPayloadProps) {
  try {
    yield put(setSessionAttributes({ ...action.payload }));
  } catch (err) {}
}

export function* DownloadApiWatcher() {
  yield takeEvery(
    ActionTypes.ActionDownloadTranscript.DOWNLOAD_MESSAGE,
    DownloadApiWorker
  );
}

export function* DownloadApiWorker(action: GetDownloadTranscriptProps) {

}



export function* SurveyAttributesWatcher() {
  yield takeEvery(
    ActionTypes.ActionSurveyLinkAPI.SET_SURVEY_ATTRIBUTES,
    SurveyAttributesWorker
  );
}

export function* SurveyAttributesWorker(action: GetSurveyLinkProps) {
  try {
    yield put(setSurveyAttributes({ ...action.payload }));
  } catch (err) {}
}


export function* SurveyTokenApiWatcher() {
  yield takeEvery(
    ActionTypes.ActionSurveyTokenAPI.SURVEY_TOKEN_API,
    SurveyTokenApiWorker
  );
}

export function* SurveyTokenApiWorker(action: GetSurveyTokenProps) {
//   try {
//     const { data } = yield call(ApiService, {
//       baseURL: action.payload.API_URL,
//       url: API_URLS.SURVEY_TOKEN,
//       headers: {"accessKeyId": action.payload.KEY, "accessKeySecret": action.payload.SECRET,"tenantId": 'SENTARA', "Ocp-Apim-Subscription-Key": action.payload.API_KEY,"Authorization": action.payload.authToken},
//     });


// action.payload.onSuccess(data);
//   } catch (err) {}
}


export function* SurveyLinkApiWatcher() {
  yield takeEvery(
    ActionTypes.ActionSurveyLinkAPI.SURVEY_LINK_API,
    SurveyLinkApiWorker
  );
}

export function* SurveyLinkApiWorker(action: GetSurveyLinkProps) {
//   try {
//     const { data } = yield call(ApiService, {
//       baseURL: action.payload.API_URL,
//       url: action.payload.URL,
//       headers: {"Authorization": action.payload.authToken, 'SurveyAuthorization':action.payload.TOKEN, "tenantId": 'SENTARA',"Ocp-Apim-Subscription-Key": action.payload.API_KEY,},
//       data: action.payload.USER
//     });

// action.payload.onSuccess(data);
//   } catch (err) {}
}


export function* SurveySearchApiWatcher() {
  yield takeEvery(
    ActionTypes.ActionSurveyLinkAPI.SURVEY_SEARCH_API,
    SurveySearchApiWorker
  );
}

export function* SurveySearchApiWorker(action: GetSurveyLinkProps) {
//   try {
//     const { data } = yield call(ApiService, {
//       baseURL: action.payload.API_URL,
//       url: action.payload.URL,
//       headers: {"Authorization": action.payload.authToken,'SurveyAuthorization':action.payload.TOKEN,"Ocp-Apim-Subscription-Key": action.payload.API_KEY,"Domain": 'SENTARA',"tenantId": 'SENTARA'},
//       data: action.payload.USER
//     });

// action.payload.onSuccess(data);
//   } catch (err) {

//    action.payload.onFailure(err);


//  }
}