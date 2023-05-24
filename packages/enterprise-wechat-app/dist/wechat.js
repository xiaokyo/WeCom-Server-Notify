"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
__exportStar(require("./type"), exports);
class wechat {
    config;
    token;
    constructor(config) {
        this.config = config;
    }
    async getToken() {
        const { corpid, corpsecret } = this.config;
        const url = `/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`;
        const res = await request_1.get({ url });
        if (res && res.access_token) {
            this.token = res.access_token;
        }
        return res;
    }
    setToken(token) {
        this.token = token;
    }
    async sendText(content = 'hello world') {
        return await this.apiSend({ data: content });
    }
    async sendTextCard(data) {
        data.btntxt = data.btntxt ? data.btntxt : '详情';
        return await this.apiSend({ data, msgtype: 'textcard' });
    }
    async apiSend({ data, msgtype = 'text' }) {
        const url = `/cgi-bin/message/send?access_token=${this.token}`;
        const params = {
            url,
            data: {
                touser: '@all',
                agentid: this.config.agentId,
                msgtype,
                text: {
                    content: data,
                },
            },
        };
        if (msgtype != 'text') {
            delete params.data.text;
        }
        if (msgtype == 'textcard') {
            params.data['textcard'] = data;
        }
        return await request_1.post(params);
    }
}
exports.default = wechat;
//# sourceMappingURL=wechat.js.map