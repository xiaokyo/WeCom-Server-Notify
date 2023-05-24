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
exports.douyin = void 0;
var axios_1 = __importDefault(require("axios"));
var axios = axios_1.default.create({
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
    },
});
function output(arrs) {
    return { items: arrs };
}
function douyin(url) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var keyword, keywordArr, result, res, _b, query, paths, id, url_1, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    keyword = url ||
                        '5.84 PkP:/ 男人养6只企鹅当宠物，别人遛猫遛狗，他上街却是溜企鹅 %%电影%%电影解说@DOU+小助手   https://v.douyin.com/LfWL65s/ 复制此链接，打开Dou音搜索，直接观看视频！';
                    if (keyword.length > 50) {
                        keywordArr = keyword.match(/https:(.*?)复制/im);
                        keyword = 'https:' + keywordArr[1];
                        console.log(keyword);
                    }
                    result = {};
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4, axios.get(keyword)];
                case 2:
                    res = _c.sent();
                    _b = res.request.path, query = _b === void 0 ? '' : _b;
                    query = (_a = query.split('?')[0]) !== null && _a !== void 0 ? _a : '';
                    paths = query.replace(/\/$/, '').split('/');
                    id = paths[paths.length - 1];
                    url_1 = "https://www.douyin.com/video/" + id;
                    return [4, axios
                            .get(url_1, {
                            headers: {
                                cookie: 'MONITOR_WEB_ID=6ff04bdd-bfcd-4a19-a1fe-0494d7f96766; MONITOR_DEVICE_ID=c77ba711-2562-4165-b2bb-d8ad581db064; douyin.com; __ac_referer=__ac_blank; ttcid=71de2795b19d4b3a95654d56d50fa4fd32; _tea_utm_cache_6383=undefined; _tea_utm_cache_1300=undefined; MONITOR_WEB_ID=a2471e19-b240-4dfd-9937-d203c89e18bc; passport_csrf_token_default=64eff11e663d2d0aef44cdd4d5101c07; passport_csrf_token=64eff11e663d2d0aef44cdd4d5101c07; MONITOR_DEVICE_ID=43c191e5-96d1-47ae-bcda-0f15b3570262; n_mh=pxLId9nIkLQhkKWkZSDY9x33LtssJS-RDXGLKa_H4J4; passport_auth_status_ss=2be478cac1f65fd79c79efcf5baf0eb4%2C; passport_auth_status=2be478cac1f65fd79c79efcf5baf0eb4%2C; ttwid=1%7CQpM_GnDEh-aJ9DYVRus8Q46jbRgBn2khCclM0Zpcpp4%7C1643554918%7C70abe9be8ed14873bd31082770698e47f99d1dc13bda598808644aa0d0fb00e0; THEME_STAY_TIME=299471; IS_HIDE_THEME_CHANGE=1; pwa_guide_count=3; s_v_web_id=verify_24a809fc1a3e44d10a0e8396be50d8e0; _tea_utm_cache_2018=undefined; odin_tt=53bff82b1b08f55d95efb772a795b61f896a52344f6dfa88224eab8965a1bf22; AB_LOGIN_GUIDE_TIMESTAMP=1643558449249; msToken=Oa_GOhRr-Iaf7lXTZz_EsI5ITpdAw_HyrhjAT8607lWFOSwDULT09GW1hdeAPiHGOwixWZsCpKIdK9a1cib-_w2v8N8MIPRJnHubimvfse9Csfa_G6MptQ==; douyin.com; __ac_nonce=061f765850097f000ce2e; __ac_signature=_02B4Z6wo00f01Lwk7VgAAIDBxOoGXezZ3zi8AOnAAE8DfuQqnnLmoOdQzsV-P9md6S1UnsRhjJgYW0FDRxbb5Rm6jKxl0xpGB8BJXnWrrOZpfAEbHa2A1T6TVR7uIy4x6OXv9z21-jppqbmHa5; tt_scid=LivqLJmo3ZpXcFS2G7F8SSADMLyHetyVvutToKN49cxCCBsBTpknjuTMJgJlb8upb607; msToken=tXkiStHUFuynfxUo9APn33lciP-lTqV9r4D1pD2XvVGkNfrbVzOEgKTC90wycpJWdni56LHHDJRpfFVKySkUwqVyOlPsS1oB1k6Ykj62_44drjADogwBXA9T3AvliHo=; home_can_add_dy_2_desktop=1',
                            },
                        })
                            .then(function (res) {
                            var _a, _b;
                            var reg = new RegExp("<script id=\"RENDER_DATA\" type=\"application/json\">.*?</script>", 'im');
                            var jsonData = '';
                            res.data.replace(reg, function (a, b) {
                                jsonData = JSON.parse(decodeURIComponent(a
                                    .replace('<script id="RENDER_DATA" type="application/json">', '')
                                    .replace('</script>', '')));
                                return b;
                            });
                            var videoUrl = (_a = jsonData['34']['aweme']['detail']['video']['playAddr'][0].src) !== null && _a !== void 0 ? _a : '';
                            var desc = (_b = jsonData['34']['aweme']['detail']['desc']) !== null && _b !== void 0 ? _b : '';
                            result = output([
                                {
                                    title: '无水印视频',
                                    subtitle: desc,
                                    arg: "https:" + videoUrl,
                                },
                            ]);
                        })];
                case 3:
                    _c.sent();
                    return [3, 5];
                case 4:
                    err_1 = _c.sent();
                    result = output([
                        {
                            title: err_1.message,
                            subtitle: err_1.message,
                        },
                    ]);
                    return [3, 5];
                case 5: return [2, result];
            }
        });
    });
}
exports.douyin = douyin;
