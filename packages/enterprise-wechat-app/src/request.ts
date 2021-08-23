import axios, { AxiosRequestConfig } from 'axios'

/**
 * 企业微信统一返回格式
 */
export interface globalResponse {
  // 错误代码
  errcode: number
  // 错误信息
  errmsg: string

  // other
  [key: string]: any
}

const instance = axios.create({
  baseURL: 'https://qyapi.weixin.qq.com',
  headers: {
    'content-type': 'application/json',
  },
  timeout: 10000, // 10秒
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export const get = (data: AxiosRequestConfig) => {
  return instance({ method: 'get', ...data })
    .then(res => res.data as globalResponse)
    .catch(err => {})
}

export const post = (data: AxiosRequestConfig) => {
  return instance({
    method: 'post',
    ...data,
  })
    .then(res => res.data as globalResponse)
    .catch(err => {})
}

export default instance
