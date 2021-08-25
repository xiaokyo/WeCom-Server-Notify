import { WechatConfig } from '@xiaokyo/enterprise-wechat-app'
import express from 'express'
import getWechatToken from './get-token'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get('/apis/sendText', async function (req, res) {
  interface SendTextQuery extends WechatConfig {
    content: string
  }
  const { content = 'enterprise wechat app manager', ...options }: SendTextQuery = req.query as any
  const wc = await getWechatToken(options)
  const sendRes = await wc.sendText(`${content}`)
  res.send(sendRes)
})

app.post('/apis/sendTextCard', async function (req, res) {
  const { textcard, ...options } = req.body as any
  const wc = await getWechatToken(options)
  const sendRes = await wc.sendTextCard(textcard)
  res.send(sendRes)
})

app.listen(3000)

// wc.sendText(config.token, `you can do anything`).then(res => {
//   console.log(res)
// })

// wc.sendTextCard(config.token, {
//   title: '通知',
//   description:
//     '<div class="gray">2016年9月26日</div> <div class="normal">恭喜你抽中iPhone 7一台，领奖码：xxxx</div><div class="highlight">请于2016年10月10日前联系行政同事领取</div>',
//   url: 'https://www.baidu.com',
// })
