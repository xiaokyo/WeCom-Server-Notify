export interface WechatConfig {
  corpid: string
  corpsecret: string
  agentId: string
}
export interface ApiSendParams {
  data: string | TextCard
  msgtype?: 'text' | 'textcard'
}
export interface TextCard {
  title: string
  description: string
  url: string
  btntxt?: string
}
