import express from 'express'
import { douyin } from './douyin'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

/**
 * 抖音去水印
 */
app.post('/waterMarkClean/Douyin', async (req, res) => {
  try {
    let { url = '' } = req.body as any
    if (!url) throw new Error('url is required')
    url = decodeURIComponent(url).trim()
    const data = await douyin(url)
    res.send(data)
  } catch (err) {
    res.send(err.message)
  }
})

app.listen(3001)
