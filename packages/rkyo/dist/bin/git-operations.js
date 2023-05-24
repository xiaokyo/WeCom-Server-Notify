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
var prompts_1 = __importDefault(require("prompts"));
var child_process_1 = require("child_process");
var chalk_1 = __importDefault(require("chalk"));
var git_emoji_1 = __importDefault(require("@/const/git-emoji"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var emojis = git_emoji_1.default;
var promptsConfig = [
    {
        type: 'text',
        name: 'commitMessage',
        message: '请输入提交信息',
    },
    {
        type: 'select',
        name: 'emoji',
        message: '选择表情',
        choices: emojis.map(function (_) { return ({
            title: _.icon + " " + _.code + " " + _.desc,
            value: _.code,
        }); }),
        initial: 0,
    },
];
var getCurrentBranch = function () {
    return child_process_1.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '');
};
var push = function (skip) {
    if (skip === void 0) { skip = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var input, currentBranchName, commitMessage, emoji, force, pushCmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (skip)
                        return [2, pushBranch()];
                    return [4, prompts_1.default(promptsConfig)];
                case 1:
                    input = _a.sent();
                    currentBranchName = getCurrentBranch();
                    commitMessage = input.commitMessage, emoji = input.emoji, force = input.force;
                    if (!commitMessage || !emoji || emoji === 'undefined' || commitMessage === 'undefined')
                        return [2];
                    try {
                        child_process_1.execSync('git add .');
                        child_process_1.execSync("git commit -m " + ("\"" + emoji + " " + commitMessage + "\""));
                        pushCmd = "git push origin " + currentBranchName;
                        if (force)
                            pushCmd = pushCmd.replace('push origin', "push -f origin");
                        child_process_1.execSync(pushCmd);
                    }
                    catch (e) {
                        console.log(chalk_1.default.red(e));
                    }
                    return [2];
            }
        });
    });
};
var delMergeBranch = function (mainBranchName) {
    try {
        var mergedBranchs = child_process_1.execSync('git branch --merged')
            .toString()
            .replace(/\*/gm, '')
            .replace(/master/, '')
            .split(/\n/)
            .map(function (_) { return _.trim(); })
            .filter(function (_) { return _; });
        child_process_1.execSync("git checkout " + mainBranchName);
        if (mergedBranchs.length <= 0)
            throw new Error('no merged branchs');
        for (var _i = 0, mergedBranchs_1 = mergedBranchs; _i < mergedBranchs_1.length; _i++) {
            var branchName = mergedBranchs_1[_i];
            if (branchName == 'master')
                continue;
            try {
                child_process_1.execSync("git branch -D " + branchName);
                console.log(chalk_1.default.green(branchName + " branch has del success"));
            }
            catch (e) {
                console.log(e.message);
            }
        }
    }
    catch (e) {
        console.log(chalk_1.default.red(e));
    }
};
var lookBranchsDesc = function (branch, desc) {
    if (branch === void 0) { branch = ''; }
    if (desc === void 0) { desc = ''; }
    var branchs = child_process_1.execSync('git branch')
        .toString()
        .replace(/\*/gm, '')
        .split(/\n/)
        .map(function (_) { return _.trim(); })
        .filter(function (_) { return _; });
    var maxLen = branchs.reduce(function (max, cur) {
        if (max < cur.length)
            return cur.length;
        return max;
    }, 0);
    if (desc !== '') {
        var currentBranchName = getCurrentBranch();
        if (branch !== '') {
            currentBranchName = branch;
        }
        child_process_1.execSync("git config branch." + currentBranchName + ".description " + desc);
    }
    else {
        branchs.forEach(function (_) {
            try {
                var spaceLen = maxLen - _.length + 1;
                var space_1 = new Array(spaceLen).fill(' ').join('');
                child_process_1.exec("git config branch." + _ + ".description", function (err, stdout, stderr) {
                    console.log("" + _ + space_1 + (stdout ? '-- ' + stdout.trim().replace(/\r\n/g, '') : ''));
                });
            }
            catch (e) {
                console.error("\u9519\u8BEF\u4E86: " + _, e);
            }
        });
    }
};
var pushBranch = function () {
    var currentBranchName = getCurrentBranch();
    child_process_1.exec("git push origin " + currentBranchName, function (err, stdout, stderr) {
        if (err) {
            console.log(chalk_1.default.red(err || stderr));
        }
        else {
            console.log(chalk_1.default.green(stdout));
        }
    });
};
var pullBranch = function (rebase) {
    var currentBranchName = getCurrentBranch();
    var pullCmd = rebase
        ? "git pull -r origin " + currentBranchName
        : "git pull origin " + currentBranchName;
    child_process_1.exec(pullCmd);
};
var newTagPush = function () {
    var pkg = require(path_1.default.resolve('.', 'package.json'));
    console.log(pkg.version);
    var version = pkg.version;
    if (!version)
        throw new Error('version is required in package.json');
    var tagArr = version.split('.');
    if (tagArr.length !== 3)
        throw new Error('version must like 1.0.0');
    var last = tagArr[tagArr.length - 1];
    if (Number(last) >= 9) {
        tagArr[tagArr.length - 1] = 0;
        var lastSecond = Number(tagArr[tagArr.length - 2]) + 1;
        if (Number(lastSecond) >= 9) {
            tagArr[tagArr.length - 2] = 0;
            tagArr[0] = Number(tagArr[0]) + 1;
        }
        else {
            tagArr[tagArr.length - 2] = lastSecond;
        }
    }
    else {
        tagArr[tagArr.length - 1] = Number(tagArr[tagArr.length - 1]) + 1;
    }
    var newVersion = tagArr.join('.');
    pkg.version = newVersion;
    fs_1.default.writeFileSync(path_1.default.resolve('.', 'package.json'), JSON.stringify(pkg, null, 2));
    child_process_1.execSync('git add .');
    child_process_1.execSync("git commit -m \"tag: " + newVersion + "\"");
    child_process_1.execSync("git tag " + newVersion);
    child_process_1.execSync("git push origin " + newVersion);
    var currentBranchName = getCurrentBranch();
    child_process_1.execSync('git push origin ' + currentBranchName);
};
exports.default = (function () {
    return [
        {
            command: 'git-push [skip]',
            description: 'git push规范提交',
            action: function (skip) {
                push(!!skip);
            },
        },
        {
            command: 'git-del [mainBranchName]',
            description: '删除合并过的分支',
            action: function (mainBranchName) {
                if (mainBranchName === void 0) { mainBranchName = 'master'; }
                delMergeBranch(mainBranchName);
            },
        },
        {
            command: 'git-tag',
            description: '新建一个tag, package.json patch递增, 并提交到远程',
            action: function () {
                newTagPush();
            },
        },
        {
            command: 'git-desc [branch] [desc]',
            description: '查看分支的描述集合',
            action: function (branch, desc) {
                if (branch === void 0) { branch = ''; }
                if (desc === void 0) { desc = ''; }
                lookBranchsDesc(branch, desc);
            },
        },
        {
            command: 'git-pull [rebase]',
            description: '拉取分支',
            action: function (rebase) {
                if (rebase === void 0) { rebase = false; }
                pullBranch(rebase);
            },
        },
    ];
});
