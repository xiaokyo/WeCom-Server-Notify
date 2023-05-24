"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://qyapi.weixin.qq.com',
    headers: {
        'content-type': 'application/json',
    },
    timeout: 10000,
});
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
const get = (data) => {
    return instance({ method: 'get', ...data })
        .then(res => res.data)
        .catch(err => { });
};
exports.get = get;
const post = (data) => {
    return instance({
        method: 'post',
        ...data,
    })
        .then(res => res.data)
        .catch(err => { });
};
exports.post = post;
exports.default = instance;
//# sourceMappingURL=request.js.map