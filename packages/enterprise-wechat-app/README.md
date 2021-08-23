# `@xiaokyo/create-wechat-message`

> TODO: description

## Usage

```javascript
const wechat = require('@xiaokyo/create-wechat-message').default;
or
import wechat from '@xiaokyo/create-wechat-message' 

const wx = new wechat({
	corpid: 'xxx', // 应用id
  corpsecret: 'xxx', // 应用secret
  agentId: 'xxx', // 企业id
})
```

## API

| name         | desc             | params                                                       |
| ------------ | ---------------- | ------------------------------------------------------------ |
| getToken     | 获取token        |                                                              |
| sendText     | 发送文本消息     | (*token*: string, *content*: string = 'hello world')         |
| sendTextCard | 发送文本卡片消息 | (*token*: string,*data*: { title: string; description: string; url: string; btntxt?: string }) |

