"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@/common");
var start = function () {
    var USER_HOME = common_1.getHomePath();
    var NPMRC_PATH = USER_HOME + '/.npmrc';
    var NPMRCBC_PATH = USER_HOME + '/.npmrc-backup';
    var YARNRC_PATH = USER_HOME + '/.yarnrc';
    var YARNRCBC_PATH = USER_HOME + '/.yarnrc-backup';
    var npmrc = common_1.readFileSync(NPMRC_PATH);
    var npmrcBc = common_1.readFileSync(NPMRCBC_PATH);
    var yarnrc = common_1.readFileSync(YARNRC_PATH);
    var yarnrcBc = common_1.readFileSync(YARNRCBC_PATH);
    common_1.writeFileSync(NPMRC_PATH, npmrcBc);
    common_1.writeFileSync(NPMRCBC_PATH, npmrc);
    common_1.writeFileSync(YARNRC_PATH, yarnrcBc);
    common_1.writeFileSync(YARNRCBC_PATH, yarnrc);
};
exports.default = (function () {
    return [
        {
            command: 'registry-change',
            description: '.npmrc和.npmrc-backup互相替换, .yarnrc和.yarnrc-backup互相替换',
            action: function () {
                start();
            },
        },
    ];
});
