import wechat from '@xiaokyo/enterprise-wechat-app'
import config from './wechat.config'

const wc = new wechat(config)

if (!config.token) {
  wc.getToken().then(data => {
    console.log(data)
  })
}

// wc.sendText(config.token, `you can do anything`).then(res => {
//   console.log(res)
// })

wc.sendTextCard(config.token, {
  title: '通知',
  description:
    '<div class="gray">2016年9月26日</div> <div class="normal">恭喜你抽中iPhone 7一台，领奖码：xxxx</div><div class="highlight">请于2016年10月10日前联系行政同事领取</div>',
  url: 'https://www.baidu.com',
})
