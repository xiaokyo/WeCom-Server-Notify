"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.post = void 0;
var axios_1 = __importDefault(require("axios"));
var instance = axios_1.default.create({
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});
var post = function (_a) {
    var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.data, data = _c === void 0 ? {} : _c, _d = _a.params, params = _d === void 0 ? {} : _d, _e = _a.headers, headers = _e === void 0 ? {} : _e;
    return instance({
        method: 'POST',
        url: url,
        data: data,
        params: params,
        headers: headers,
    });
};
exports.post = post;
var get = function (_a) {
    var _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.data, data = _c === void 0 ? {} : _c, _d = _a.params, params = _d === void 0 ? {} : _d, _e = _a.headers, headers = _e === void 0 ? {} : _e;
    return instance({
        method: 'GET',
        url: url,
        data: data,
        params: params,
        headers: headers,
    });
};
exports.get = get;
