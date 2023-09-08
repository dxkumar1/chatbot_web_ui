import axios from 'axios';
import { ApiProps } from './api-interfaces';

const ApiService = ({ baseURL, url, headers, params, data }: ApiProps): Promise<object> => {

    return (data ? axios.request({
        baseURL,
        url: url.URI,
        method: url.METHOD,
        headers: { Accept: '*/*', ...headers },
        data: { ...data }
    }).catch(error => error.toJSON()) : axios.request({
        baseURL,
        url: url.URI,
        method: url.METHOD,
        headers: { Accept: '*/*', ...headers},
        params: { ...params }
    }).catch(error => error.toJSON())
    )
}

export default ApiService;
