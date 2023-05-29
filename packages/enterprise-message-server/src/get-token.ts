import wechat, { WechatConfig } from '@xiaokyo/enterprise-wechat-app'
import { getEnterprise, setEnterprise } from './common/enterprise-info'
import getEnvs from './common/get-envs'

const getWechatToken = async (secret: string): Promise<wechat> => {
  if (!secret) throw new Error('secret is required.')
  const envs = await getEnvs()
  if (secret !== envs.PSWD) throw new Error('secret is error')
  let { token } = await getEnterprise(secret, true)
  const { CORP_ID: corpid, CORP_SECRET: corpsecret, AGENT_ID: agentId } = envs
  const wc = new wechat({ corpid: `${corpid}`, corpsecret: `${corpsecret}`, agentId: `${agentId}` })
  if (!token) {
    const tokenRes = await wc.getToken()
    if (!tokenRes || (tokenRes && tokenRes.errcode !== 0)) {
      // 未获取到token
      throw new Error('get token faild')
    }

    if (tokenRes && tokenRes.access_token) {
      setEnterprise(secret, { token: tokenRes.access_token })
      token = tokenRes.access_token
    }
  }

  if (!token) throw new Error('no token')
  return wc
}

export const vaildToken = async (options: WechatConfig) => {
  const { corpid, corpsecret, agentId } = options
  const wc = new wechat({ corpid, corpsecret, agentId })
  const res = await wc.getToken()
  if (!res || (res && res.errcode !== 0)) throw new Error('get token faild')
  if (res.access_token) {
    return res.access_token
  }
  return ''
}

export default getWechatToken
