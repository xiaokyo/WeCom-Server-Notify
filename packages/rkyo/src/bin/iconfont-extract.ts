/**
 * 从iconfont提取需要的icon svg
 */

import https from 'https'
import ora from 'ora'
import template from '@/const/iconfont.temp'
import { writeFileSync, getRunPath } from '@/common'

const start = () => {
  const { needIcons, jsUrl, output } = require(getRunPath('iconfont.need.json'))

  const spinner = ora('Loading iconfont:' + jsUrl).start()
  geticonjs(jsUrl, function (iconfontjs) {
    spinner.color = 'green'
    spinner.text = 'write file:' + output + '/iconfont.js'
    let symbols = ``
    const icons = needIcons
    iconfontjs = iconfontjs.toString()
    for (const icon of icons) {
      const findStart = iconfontjs.indexOf(`<symbol id="${icon}"`)
      if (findStart > -1) {
        let temp = iconfontjs.substring(findStart, iconfontjs.length)
        let findEnd = temp.indexOf('</symbol>')
        if (findEnd > -1) findEnd += '</symbol>'.length + findStart
        temp = iconfontjs.substring(findStart, findEnd)
        symbols += temp
      }
    }
    writeFileSync(getRunPath(output + '/iconfont.js'), template.replace('{{icons}}', symbols))
    setTimeout(() => {
      spinner.stop()
    }, 2000)
  })
}

const geticonjs = (path, cb) => {
  const options = {
    hostname: 'at.alicdn.com',
    port: 443,
    path: path.replace(/https:\/\/at\.alicdn\.com/, ''),
    method: 'GET',
  }

  let str = ''
  const req = https.request(options, res => {
    res.on('data', d => {
      str += d
    })

    res.on('end', () => {
      if (res.statusCode == 200) {
        cb(str)
      }
    })
  })

  req.on('error', e => {
    console.error(e)
  })
  req.end()
}

export default () => {
  return [
    {
      command: 'extract-iconfont',
      description: '提取需要的iconfont, 配置需要的iconfonts [iconfont.need.json]',
      action: start,
    },
  ]
}
