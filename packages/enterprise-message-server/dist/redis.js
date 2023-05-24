"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClean = exports.redisExists = exports.redisGet = exports.redisSet = void 0;
var fs_1 = __importDefault(require("fs"));
var redisPath = './tmp/redis';
var client = {
    set: function (key, value) {
        if (!fs_1.default.existsSync(redisPath)) {
            fs_1.default.mkdirSync(redisPath);
        }
        fs_1.default.writeFileSync(redisPath + "/" + key + ".txt", value, { encoding: 'utf-8' });
    },
    expire: function (key, expires) { },
    get: function (key, callback) {
        fs_1.default.readFile(redisPath + "/" + key + ".txt", { encoding: 'utf-8' }, function (err, data) {
            callback(err, data);
        });
    },
    exists: function (key, callback) {
        fs_1.default.access(redisPath + "/" + key + ".txt", function (err) {
            callback(err, err ? 0 : 1);
        });
    },
    del: function (key) {
        fs_1.default.unlinkSync(redisPath + "/" + key + ".txt");
    },
};
function redisSet(key, value, expires) {
    client.set(key, value);
    expires && client.expire(key, expires);
}
exports.redisSet = redisSet;
function redisGet(key) {
    return new Promise(function (resolve) {
        client.get(key, function (err, reply) {
            if (err)
                return resolve('');
            resolve(reply);
        });
    });
}
exports.redisGet = redisGet;
function redisExists(key) {
    return new Promise(function (resolve) {
        client.exists(key, function (err, number) {
            resolve(err ? false : number == 1);
        });
    });
}
exports.redisExists = redisExists;
function redisClean(key) {
    client.del(key);
}
exports.redisClean = redisClean;
exports.default = client;
