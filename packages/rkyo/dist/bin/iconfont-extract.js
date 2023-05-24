"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var ora_1 = __importDefault(require("ora"));
var iconfont_temp_1 = __importDefault(require("@/const/iconfont.temp"));
var common_1 = require("@/common");
var start = function () {
    var _a = require(common_1.getRunPath('iconfont.need.json')), needIcons = _a.needIcons, jsUrl = _a.jsUrl, output = _a.output;
    var spinner = ora_1.default('Loading iconfont:' + jsUrl).start();
    geticonjs(jsUrl, function (iconfontjs) {
        spinner.color = 'green';
        spinner.text = 'write file:' + output + '/iconfont.js';
        var symbols = "";
        var icons = needIcons;
        iconfontjs = iconfontjs.toString();
        for (var _i = 0, icons_1 = icons; _i < icons_1.length; _i++) {
            var icon = icons_1[_i];
            var findStart = iconfontjs.indexOf("<symbol id=\"" + icon + "\"");
            if (findStart > -1) {
                var temp = iconfontjs.substring(findStart, iconfontjs.length);
                var findEnd = temp.indexOf('</symbol>');
                if (findEnd > -1)
                    findEnd += '</symbol>'.length + findStart;
                temp = iconfontjs.substring(findStart, findEnd);
                symbols += temp;
            }
        }
        common_1.writeFileSync(common_1.getRunPath(output + '/iconfont.js'), iconfont_temp_1.default.replace('{{icons}}', symbols));
        setTimeout(function () {
            spinner.stop();
        }, 2000);
    });
};
var geticonjs = function (path, cb) {
    var options = {
        hostname: 'at.alicdn.com',
        port: 443,
        path: path.replace(/https:\/\/at\.alicdn\.com/, ''),
        method: 'GET',
    };
    var str = '';
    var req = https_1.default.request(options, function (res) {
        res.on('data', function (d) {
            str += d;
        });
        res.on('end', function () {
            if (res.statusCode == 200) {
                cb(str);
            }
        });
    });
    req.on('error', function (e) {
        console.error(e);
    });
    req.end();
};
exports.default = (function () {
    return [
        {
            command: 'extract-iconfont',
            description: '提取需要的iconfont, 配置需要的iconfonts [iconfont.need.json]',
            action: start,
        },
    ];
});
