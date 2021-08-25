import wechat, { WechatConfig } from '@xiaokyo/enterprise-wechat-app'
import { redisGet, redisSet } from './redis'

const getWechatToken = async ({ corpid, corpsecret, agentId }: WechatConfig): Promise<wechat> => {
  const wc = new wechat({ corpid: `${corpid}`, corpsecret: `${corpsecret}`, agentId: `${agentId}` })
  if (!corpid || !corpsecret || !agentId) throw new Error('params invaild')

  const redisKey = `${corpid}-${agentId}-${corpsecret}`
  let token = await redisGet(redisKey)
  if (!token) {
    const tokenRes = await wc.getToken()

    if (!tokenRes || (tokenRes && tokenRes.errcode !== 0)) {
      // 未获取到token
      throw new Error('get token faild')
    }

    if (tokenRes && tokenRes.access_token) {
      redisSet(redisKey, tokenRes.access_token)
      token = tokenRes.access_token
    }
  }

  if (!token) throw new Error('no token')
  wc.setToken(token)

  return wc
}

export default getWechatToken
