import { WechatConfig } from '@xiaokyo/enterprise-wechat-app'
import express from 'express'
import getWechatToken, { vaildToken } from './get-token'
import { v4 as uuidv4 } from 'uuid'
import { existsEnterprise, getEnterprise, setEnterprise } from './common/enterprise-info'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get('/enterprise/getSecret', async (req, res) => {
  try {
    const { pswd }: WechatConfig & any = req.query as any
    const { CORP_ID: corpid, CORP_SECRET: corpsecret, AGENT_ID: agentId, PSWD } = process.env
    const options = { corpid, corpsecret, agentId }
    if (!pswd) throw new Error('pswd is required')
    if (pswd !== PSWD) throw new Error('pswd is error')
    if (await existsEnterprise(pswd)) {
      res.send(await getEnterprise(pswd))
      return
    }
    const token = await vaildToken(options)
    if (token) {
      const uid = uuidv4()
      setEnterprise(uid, options)
      setEnterprise(pswd, uid)
      res.send(uid)
    }
  } catch (err) {
    console.log(err)
    res.send(err.message)
  }
})

app.get('/enterprise/sendText', async (req, res) => {
  try {
    const { content = 'enterprise wechat app manager', secret = '' } = req.query as any
    const wc = await getWechatToken(secret)
    let sendRes = await wc.sendText(`${content}`)
    if (sendRes && sendRes.errcode === 40014) {
      const { access_token: token }: any = await wc.getToken()
      setEnterprise(secret, { ...wc.config, token })
      sendRes = await wc.sendText(`${content}`)
    }
    res.send(sendRes)
  } catch (err) {
    res.send(err.message)
  }
})

app.post('/enterprise/sendTextCard', async function (req, res) {
  try {
    const { secret = '' } = req.query as any
    const { textcard } = req.body as any
    const wc = await getWechatToken(secret)
    let sendRes = await wc.sendTextCard(textcard)
    if (sendRes && sendRes.errcode === 40014) {
      const { access_token: token }: any = await wc.getToken()
      setEnterprise(secret, { ...wc.config, token })
      sendRes = await wc.sendTextCard(textcard)
    }
    res.send(sendRes)
  } catch (err) {
    res.send(err.message)
  }
})

app.get('/', async function (req, res) {
  res.send('enterprise start done')
})

app.listen(4000)

// wc.sendText(config.token, `you can do anything`).then(res => {
//   console.log(res)
// })

// wc.sendTextCard(config.token, {
//   title: '通知',
//   description:
//     '<div class="gray">2016年9月26日</div> <div class="normal">恭喜你抽中iPhone 7一台，领奖码：xxxx</div><div class="highlight">请于2016年10月10日前联系行政同事领取</div>',
//   url: 'https://www.baidu.com',
// })
