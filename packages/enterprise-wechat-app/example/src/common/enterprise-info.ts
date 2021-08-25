import { redisClean, redisExists, redisGet, redisSet } from '../redis'

export const setEnterprise = (key, value) => {
  const data = typeof value == 'object' ? JSON.stringify(value) : value
  redisSet(`enterprise(${key})`, data)
}

export const getEnterprise = async (key: string, parse: boolean = false) => {
  const value = await redisGet(`enterprise(${key})`)
  return parse ? JSON.parse(value ?? '{}') : value
}

export const delEnterprise = key => {
  redisClean(key)
}

export const existsEnterprise = async (key: string) => {
  return await redisExists(`enterprise(${key})`)
}
