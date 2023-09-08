
export interface ApiProps {
    baseURL?: string;
    url: ConstApiProps;
    headers?: object;
    params?: object;
    data?: object;
}

export interface ConstApiProps {
    URI: string;
    METHOD: API_POST_METHODS;
    IS_SECURE: boolean;
}

export enum API_POST_METHODS {
    GET = 'GET',
    POST = 'POST'
}

export interface ConstApiUrlsProps {
    DOWNLOAD_MESSAGE: ConstApiProps,
    SURVEY_TOKEN:ConstApiProps,
    SURVEY_LINK:ConstApiProps,
    SURVEY_SEARCH:ConstApiProps,
    SURVEY_EMAIL:ConstApiProps,


}
