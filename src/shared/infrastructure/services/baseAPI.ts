import axios from 'axios';
import {app} from 'shared/infrastructure/config'

export namespace BaseAPI {
    axios.defaults.baseURL = app.API_BASE_URL;
    const axiosInstance = axios.create({})


    export const get = (url: string, params: any = {}, headers: any = {}): Promise<any> => {
        return axiosInstance({
            method: 'GET',
            url: url,
            params: params,
            headers: headers
        })
    }
    export const post = (url: string, data?: any, params: any = {}, headers: any = {}): Promise<any> => {
        return axiosInstance({
            method: 'POST',
            url: url,
            data: data ? data : null,
            params: params,
            headers: headers
        })
    }
    export const del = (url: string, data?: any, params: any = {}, headers: any = {}): Promise<any> => {
        return axiosInstance({
            method: 'DELETE',
            url: url,
            data: data ? data : null,
            params: params,
            headers: headers
        })
    }
    export const put = (url: string, data?: any, params: any = {}, headers: any = {}): Promise<any> => {
        return axiosInstance({
            method: 'PUT',
            url: url,
            data: data ? data : null,
            params: params,
            headers: headers
        })
    }
}