
import { ConstApiUrlsProps, API_POST_METHODS } from './api-interfaces'


const API_URLS: ConstApiUrlsProps = {
   DOWNLOAD_MESSAGE: {
      URI: `/httpOnDownload`,
      METHOD: API_POST_METHODS.POST,
      IS_SECURE: false,
   },

   SURVEY_TOKEN: {
      URI: `/GetAccessToken`,
      METHOD: API_POST_METHODS.GET,
      IS_SECURE: false,
   },
   SURVEY_LINK: {
      URI: `/GetInitiateLink`,
      METHOD: API_POST_METHODS.POST,
      IS_SECURE: false,
   },
   SURVEY_SEARCH: {
      URI: `/GetSearch`,
      METHOD: API_POST_METHODS.POST,
      IS_SECURE: false,
   },
   SURVEY_EMAIL: {
      URI: `/GetSurvey`,
      METHOD: API_POST_METHODS.POST,
      IS_SECURE: false,
   },
}

const LOADER_TIMER = 60000; //1 mins
const TIMEOUT_COUNTDOWN = 120; //2MINS
const DOWNLOAD_TRANSCRIPT_TIMER = 5000; //5 secs
const DEFAULT_EMPTY_STRING = " ";
const AGENT_SURVEY_ID = "SENTARA_10482";
const BOT_SURVEY_ID = "SENTARA_12843";

export { API_URLS, LOADER_TIMER, DOWNLOAD_TRANSCRIPT_TIMER, TIMEOUT_COUNTDOWN, DEFAULT_EMPTY_STRING ,AGENT_SURVEY_ID,BOT_SURVEY_ID};
