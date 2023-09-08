import {all} from 'redux-saga/effects';
import {
    MessagesWatcher,
    SendMessageWatcher,
    SendMessageErrorWatcher,
    SessionAttributesWatcher, 
    SessionWatcher,
    DownloadApiWatcher,
    SurveyTokenApiWatcher,
    SurveyLinkApiWatcher,
    SurveySearchApiWatcher,
    SurveyAttributesWatcher

} from "./saga";
export default function* rootSaga(){
yield all([
    MessagesWatcher(),
    SendMessageWatcher(),
    SendMessageErrorWatcher(),
    SessionAttributesWatcher(),
    SessionWatcher(),
    DownloadApiWatcher(),
    SurveyTokenApiWatcher(),
    SurveyLinkApiWatcher(),
    SurveyAttributesWatcher(),
    SurveySearchApiWatcher()]);
}

