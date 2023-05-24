"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClean = exports.redisExists = exports.redisGet = exports.redisSet = void 0;
var redisObj = {};
var client = {
    set: function (key, value) {
        redisObj[key] = value;
    },
    expire: function (key, expires) { },
    get: function (key, callback) {
        callback(null, redisObj[key]);
    },
    exists: function (key, callback) {
        callback(null, !redisObj[key] ? 0 : 1);
    },
    del: function (key) {
        delete redisObj[key];
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
