import redis from 'redis'
const client = redis.createClient()

client.on('error', function (error) {
  console.error(error)
})

/**
 * 设置一个键值对
 * @param key 键
 * @param value 值
 * @param expires 失效/秒
 */
export function redisSet(key: string, value: string, expires: number = 7200) {
  client.set(key, value)
  client.expire(key, expires)
}

/**
 * 返回指定键的值
 * @param key 键
 * @returns Promise value
 */
export function redisGet(key: string) {
  return new Promise(resolve => {
    client.get(key, function (err, reply) {
      if (err) return resolve('')
      resolve(reply)
    })
  })
}

/**
 * 删除键
 * @param key 键
 */
export function redisClean(key) {
  client.del(key)
}

export default client
