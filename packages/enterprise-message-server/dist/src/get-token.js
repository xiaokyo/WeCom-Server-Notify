"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaildToken = void 0;
var enterprise_wechat_app_1 = __importDefault(require("@xiaokyo/enterprise-wechat-app"));
var enterprise_info_1 = require("./common/enterprise-info");
var get_envs_1 = __importDefault(require("./common/get-envs"));
var getWechatToken = function (secret) { return __awaiter(void 0, void 0, void 0, function () {
    var envs, token, corpid, corpsecret, agentId, wc, tokenRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!secret)
                    throw new Error('secret is required.');
                return [4, get_envs_1.default()];
            case 1:
                envs = _a.sent();
                if (secret !== envs.PSWD)
                    throw new Error('secret is error');
                return [4, enterprise_info_1.getEnterprise(secret, true)];
            case 2:
                token = (_a.sent()).token;
                corpid = envs.CORP_ID, corpsecret = envs.CORP_SECRET, agentId = envs.AGENT_ID;
                wc = new enterprise_wechat_app_1.default({ corpid: "" + corpid, corpsecret: "" + corpsecret, agentId: "" + agentId });
                if (!!token) return [3, 4];
                return [4, wc.getToken()];
            case 3:
                tokenRes = _a.sent();
                if (!tokenRes || (tokenRes && tokenRes.errcode !== 0)) {
                    throw new Error('get token faild');
                }
                if (tokenRes && tokenRes.access_token) {
                    enterprise_info_1.setEnterprise(secret, { token: tokenRes.access_token });
                    token = tokenRes.access_token;
                }
                _a.label = 4;
            case 4:
                if (!token)
                    throw new Error('no token');
                return [2, wc];
        }
    });
}); };
var vaildToken = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var corpid, corpsecret, agentId, wc, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                corpid = options.corpid, corpsecret = options.corpsecret, agentId = options.agentId;
                wc = new enterprise_wechat_app_1.default({ corpid: corpid, corpsecret: corpsecret, agentId: agentId });
                return [4, wc.getToken()];
            case 1:
                res = _a.sent();
                if (!res || (res && res.errcode !== 0))
                    throw new Error('get token faild');
                if (res.access_token) {
                    return [2, res.access_token];
                }
                return [2, ''];
        }
    });
}); };
exports.vaildToken = vaildToken;
exports.default = getWechatToken;
