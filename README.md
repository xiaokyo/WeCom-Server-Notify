# 发送通知到微信 (server酱替代版)

先提前弄到企业微信的应用信息
 - AGENT_ID
 - CORP_ID
 - CORP_SECRET

注意, 下面的教程看到第五部即可(包括第五部, 然后回到本项目, 点击一键部署即可)
[企业微信申请教程](https://github.com/easychen/wecomchan#%E5%85%B7%E4%BD%93%E6%93%8D%E4%BD%9C)


还要自己定义一个PSWD环境变量

然后点击下面按钮一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxiaokyo%2Fxiaokyo-packages&env=AGENT_ID&env=CORP_ID&env=CORP_SECRET&env=PSWD&project-name=Server%2FNotify&repository-name=Server%2FNotify)


## 如何使用

发送一个https请求即可

```javascript
// 括号记得去掉, 括号需要替换成你自己的内容
https.get("https://{VERCEL_HOST}/enterprise/sendText?secret={PSWD}&content={你想发送的信息}")
```