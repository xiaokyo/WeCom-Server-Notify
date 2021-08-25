import { get, post } from './request'
import { ApiSendParams, TextCard, WechatConfig } from './type'
export * from './type'

export default class wechat {
  config: WechatConfig
  token: string

  constructor(config: WechatConfig) {
    this.config = config
  }

  /**
   * 获取token
   * @param corpid 企业id https://work.weixin.qq.com/api/doc/90000/90135/91039#14953/corpid
   * @param corpsecret 应用的凭证密钥 https://work.weixin.qq.com/api/doc/90000/90135/91039#14953/secret
   */
  async getToken() {
    const { corpid, corpsecret } = this.config
    const url = `/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`
    const res = await get({ url })
    return res
  }

  /**
   * 设置token
   * @param token token
   */
  setToken(token: string) {
    this.token = token
  }

  /**
   * 返送文本消息
   * @param token 企业通行证token
   * @param content 发送文本
   */
  async sendText(content: string = 'hello world') {
    return await this.apiSend({ token: this.token, data: content })
  }

  async sendTextCard(data: TextCard) {
    data.btntxt = data.btntxt ? data.btntxt : '详情'
    await this.apiSend({ token: this.token, data, msgtype: 'textcard' })
  }

  async apiSend({ token, data, msgtype = 'text' }: ApiSendParams) {
    const url = `/cgi-bin/message/send?access_token=${token}`

    const params = {
      url,
      data: {
        touser: '@all',
        agentid: this.config.agentId,
        msgtype,
        text: {
          content: data,
        },
      },
    }

    if (msgtype != 'text') {
      delete params.data.text
    }

    if (msgtype == 'textcard') {
      // to do send textcard
      params.data['textcard'] = data
    }

    return await post(params)
  }
}
