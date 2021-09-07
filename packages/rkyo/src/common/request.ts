import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export const post = ({ url = '', data = {}, params = {}, headers = {} }) => {
  return instance({
    method: 'POST',
    url,
    data,
    params,
    headers,
  })
}

export const get = ({ url = '', data = {}, params = {}, headers = {} }) => {
  return instance({
    method: 'GET',
    url,
    data,
    params,
    headers,
  })
}
