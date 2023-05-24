"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunPath = exports.exitsFileSync = exports.writeFileSync = exports.readFileSync = exports.getHomePath = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getHomePath = function () {
    var USER_HOME = process.env.HOME || process.env.USERPROFILE;
    return USER_HOME;
};
exports.getHomePath = getHomePath;
var readFileSync = function (filename) {
    return fs_1.default.readFileSync(filename, { encoding: 'utf-8' });
};
exports.readFileSync = readFileSync;
var writeFileSync = function (filename, content) {
    fs_1.default.writeFileSync(filename, content, { encoding: 'utf-8' });
};
exports.writeFileSync = writeFileSync;
var exitsFileSync = function (filename) {
    return fs_1.default.existsSync(filename);
};
exports.exitsFileSync = exitsFileSync;
var getRunPath = function (filepath) {
    return path_1.default.resolve('.', filepath);
};
exports.getRunPath = getRunPath;
