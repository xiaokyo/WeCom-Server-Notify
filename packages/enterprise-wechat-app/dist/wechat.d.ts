import { ApiSendParams, TextCard, WechatConfig } from './type'
export * from './type'
export default class wechat {
  config: WechatConfig
  token: string
  constructor(config: WechatConfig)
  getToken(): Promise<void | import('./request').globalResponse>
  setToken(token: string): void
  sendText(content?: string): Promise<void | import('./request').globalResponse>
  sendTextCard(data: TextCard): Promise<void | import('./request').globalResponse>
  apiSend({ data, msgtype }: ApiSendParams): Promise<void | import('./request').globalResponse>
}
