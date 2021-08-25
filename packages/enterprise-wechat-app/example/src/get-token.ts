import wechat, { WechatConfig } from '@xiaokyo/enterprise-wechat-app'
import { getEnterprise, setEnterprise } from './common/enterprise-info'

const getWechatToken = async (secret: string): Promise<wechat> => {
  if (!secret) throw new Error('secret is required.')
  const { corpid, corpsecret, agentId, token } = await getEnterprise(secret, true)
  const wc = new wechat({ corpid: `${corpid}`, corpsecret: `${corpsecret}`, agentId: `${agentId}` })
  if (!corpid || !corpsecret || !agentId) throw new Error('params invaild')

  if (!token) {
    const tokenRes = await wc.getToken()
    console.log(tokenRes)
    if (!tokenRes || (tokenRes && tokenRes.errcode !== 0)) {
      // 未获取到token
      throw new Error('get token faild')
    }

    if (tokenRes && tokenRes.access_token) {
      setEnterprise(secret, { corpid, corpsecret, agentId, token: tokenRes.access_token })
      wc.setToken(tokenRes.access_token)
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
