import wechat from '@xiaokyo/enterprise-wechat-app'
import express from 'express'
import { redisGet, redisSet } from './redis'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get('/apis/sendText', async function (req, res) {
  const { corpid, corpsecret, agentId, content = 'enterprise wechat app manager' } = req.query
  if (!corpid || !corpsecret || !agentId)
    return res.status(400).send({ code: 10001, message: 'params invaild' })

  const wc = new wechat({ corpid: `${corpid}`, corpsecret: `${corpsecret}`, agentId: `${agentId}` })
  const redisKey = `${corpid}-${agentId}-${corpsecret}`
  // redisSet(redisKey)
  let token = await redisGet(redisKey)
  if (!token) {
    const tokenRes = await wc.getToken()
    if (!tokenRes || (tokenRes && tokenRes.errcode !== 0)) {
      // 未获取到token
      return res.send({ code: 10002, message: 'get token faild' })
    }

    if (tokenRes && tokenRes.access_token) {
      redisSet(redisKey, tokenRes.access_token)
      token = tokenRes.access_token
    }
  }

  if (typeof token !== 'string') return res.status(400)

  const sendRes = await wc.sendText(token, `${content}`)

  res.send(sendRes)
})

app.post('/apis/sendTextCard', async function (req, res) {
  res.send(req.body)
  const { corpid, corpsecret, agentId, textcard } = req.body
  if (!corpid || !corpsecret || !agentId || !textcard)
    return res.status(400).send({ code: 10001, message: 'params invaild' })

  const wc = new wechat({ corpid: `${corpid}`, corpsecret: `${corpsecret}`, agentId: `${agentId}` })
  const redisKey = `${corpid}-${agentId}-${corpsecret}`
  // redisSet(redisKey)
  let token = await redisGet(redisKey)
  if (!token) {
    const tokenRes = await wc.getToken()
    if (!tokenRes || (tokenRes && tokenRes.errcode !== 0)) {
      // 未获取到token
      return res.send({ code: 10002, message: 'get token faild' })
    }

    if (tokenRes && tokenRes.access_token) {
      redisSet(redisKey, tokenRes.access_token)
      token = tokenRes.access_token
    }
  }

  if (typeof token !== 'string') return res.status(400)
  const sendRes = await wc.sendTextCard(token, textcard)
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
