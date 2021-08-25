/**
 * 企业微信配置
 */
export interface WechatConfig {
  corpid: string
  corpsecret: string
  agentId: string
}

/**
 * 发送api参数
 */
export interface ApiSendParams {
  data: string | TextCard
  msgtype?: 'text' | 'textcard'
}

/**
 * 文本卡片
 */
export interface TextCard {
  title: string
  description: string
  url: string
  btntxt?: string
}
