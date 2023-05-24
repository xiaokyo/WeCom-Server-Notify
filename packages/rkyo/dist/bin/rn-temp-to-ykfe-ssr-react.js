"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = __importDefault(require("gulp"));
var through2_1 = __importDefault(require("through2"));
var gulp_rename_1 = __importDefault(require("gulp-rename"));
function temp2ssr() {
    return through2_1.default.obj(function (file, enc, cb) {
        if (file.isBuffer()) {
            var temp = file.contents.toString();
            temp = temp.replace(new RegExp("'./styles.less'", 'gim'), "'./index.module.less'");
            temp = temp.replace(new RegExp("'./styles'", 'gim'), "'./index.module.less'");
            temp = temp.replace(new RegExp("index.web.less", 'gim'), "index.module.less");
            temp = temp.replace(new RegExp("index.less", 'gim'), "index.module.less");
            temp = temp.replace(new RegExp("@/components/web", 'gim'), "@/components");
            file.contents = Buffer.from(temp);
        }
        this.push(file);
        cb();
    });
}
exports.default = (function () {
    return [
        {
            command: 'rn2ssr [baseUrl]',
            description: 'cj公司模版的rm三端模版转成ykfe模版',
            action: function (baseUrl) {
                if (baseUrl === void 0) { baseUrl = "src/pages/my"; }
                var distUrl = 'template/' + baseUrl.split('/')[baseUrl.split('/').length - 1];
                gulp_1.default
                    .src([
                    baseUrl + "/**/*.tsx",
                    baseUrl + "/**/*.ts",
                    "!" + baseUrl + "/**/_mobile.*",
                    "!" + baseUrl + "/**/*.native.*",
                    "!" + baseUrl + "/index.tsx",
                    "!" + baseUrl + "/**/styles/index.ts",
                ])
                    .pipe(temp2ssr())
                    .pipe(gulp_rename_1.default(function (path) {
                    if (path.basename == '_web' && path.dirname == '.') {
                        path.basename = 'render';
                    }
                    else if (path.basename == '_web') {
                        path.basename = 'index._web';
                    }
                }))
                    .pipe(gulp_1.default.dest(distUrl));
                gulp_1.default
                    .src([baseUrl + "/**/*.less", "!" + baseUrl + "/**/*.mobile.less"])
                    .pipe(gulp_rename_1.default(function (path) {
                    if (path.dirname.endsWith('styles')) {
                        path.dirname = path.dirname.replace(/(\/|)styles$/gi, '');
                    }
                    path.basename = 'index.module';
                }))
                    .pipe(gulp_1.default.dest(distUrl));
            },
        },
    ];
});
