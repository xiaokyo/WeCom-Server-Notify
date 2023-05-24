"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var express_1 = __importDefault(require("express"));
var get_token_1 = __importStar(require("./get-token"));
var uuid_1 = require("uuid");
var enterprise_info_1 = require("./common/enterprise-info");
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/enterprise/getSecret', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pswd, _a, corpid, corpsecret, agentId, PSWD, options, _b, _c, token, uid, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                pswd = req.query.pswd;
                _a = process.env, corpid = _a.CORP_ID, corpsecret = _a.CORP_SECRET, agentId = _a.AGENT_ID, PSWD = _a.PSWD;
                options = { corpid: corpid, corpsecret: corpsecret, agentId: agentId };
                if (!pswd)
                    throw new Error('pswd is required');
                if (pswd !== PSWD)
                    throw new Error('pswd is error');
                return [4, enterprise_info_1.existsEnterprise(pswd)];
            case 1:
                if (!_d.sent()) return [3, 3];
                _c = (_b = res).send;
                return [4, enterprise_info_1.getEnterprise(pswd)];
            case 2:
                _c.apply(_b, [_d.sent()]);
                return [2];
            case 3: return [4, get_token_1.vaildToken(options)];
            case 4:
                token = _d.sent();
                if (token) {
                    uid = uuid_1.v4();
                    enterprise_info_1.setEnterprise(uid, __assign(__assign({}, options), { token: token }));
                    enterprise_info_1.setEnterprise(pswd, uid);
                    res.send(uid);
                }
                return [3, 6];
            case 5:
                err_1 = _d.sent();
                console.log(err_1);
                res.send(err_1.message);
                return [3, 6];
            case 6: return [2];
        }
    });
}); });
app.get('/enterprise/sendText', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, content, _c, secret, wc, sendRes, token, err_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 6, , 7]);
                _a = req.query, _b = _a.content, content = _b === void 0 ? 'enterprise wechat app manager' : _b, _c = _a.secret, secret = _c === void 0 ? '' : _c;
                return [4, get_token_1.default(secret)];
            case 1:
                wc = _d.sent();
                return [4, wc.sendText("" + content)];
            case 2:
                sendRes = _d.sent();
                if (!(sendRes && sendRes.errcode === 40014)) return [3, 5];
                return [4, wc.getToken()];
            case 3:
                token = (_d.sent()).access_token;
                enterprise_info_1.setEnterprise(secret, __assign(__assign({}, wc.config), { token: token }));
                return [4, wc.sendText("" + content)];
            case 4:
                sendRes = _d.sent();
                _d.label = 5;
            case 5:
                res.send(sendRes);
                return [3, 7];
            case 6:
                err_2 = _d.sent();
                res.send(err_2.message);
                return [3, 7];
            case 7: return [2];
        }
    });
}); });
app.post('/enterprise/sendTextCard', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, secret, textcard, wc, sendRes, token, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.query.secret, secret = _a === void 0 ? '' : _a;
                    textcard = req.body.textcard;
                    return [4, get_token_1.default(secret)];
                case 1:
                    wc = _b.sent();
                    return [4, wc.sendTextCard(textcard)];
                case 2:
                    sendRes = _b.sent();
                    if (!(sendRes && sendRes.errcode === 40014)) return [3, 5];
                    return [4, wc.getToken()];
                case 3:
                    token = (_b.sent()).access_token;
                    enterprise_info_1.setEnterprise(secret, __assign(__assign({}, wc.config), { token: token }));
                    return [4, wc.sendTextCard(textcard)];
                case 4:
                    sendRes = _b.sent();
                    _b.label = 5;
                case 5:
                    res.send(sendRes);
                    return [3, 7];
                case 6:
                    err_3 = _b.sent();
                    res.send(err_3.message);
                    return [3, 7];
                case 7: return [2];
            }
        });
    });
});
app.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send('enterprise start done');
            return [2];
        });
    });
});
app.listen(4000);
