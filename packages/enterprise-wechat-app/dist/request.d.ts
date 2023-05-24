import { AxiosRequestConfig } from 'axios'
export interface globalResponse {
  errcode: number
  errmsg: string
  [key: string]: any
}
declare const instance: import('axios').AxiosInstance
export declare const get: (data: AxiosRequestConfig) => Promise<void | globalResponse>
export declare const post: (data: AxiosRequestConfig) => Promise<void | globalResponse>
export default instance
