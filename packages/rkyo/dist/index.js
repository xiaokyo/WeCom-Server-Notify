#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_alias_1 = __importDefault(require("module-alias"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
module_alias_1.default.addAliases({
    '@': __dirname + '/',
});
commander_1.program.version(require('../package.json').version);
function CMD(_a) {
    var command = _a.command, description = _a.description, action = _a.action;
    commander_1.program.command(command).description(description).action(action);
}
var dirs = fs_1.default.readdirSync(path_1.default.resolve(__dirname, './bin'), { encoding: 'utf-8' });
dirs.forEach(function (filename) {
    if (filename.indexOf('.js') !== -1) {
        var cmds = require('./bin/' + filename.replace('.js', '')).default();
        if (cmds instanceof Array) {
            cmds.forEach(function (obj) { return CMD(obj); });
        }
        else {
            CMD(cmds);
        }
    }
});
commander_1.program.parse(process.argv);
