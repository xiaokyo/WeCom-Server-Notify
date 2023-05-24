// import redis from 'redis'
// const client = redis.createClient({
//   host: 'redis',
// })

// client.on('error', function (error) {
//   console.error(error)
// })

import fs from 'fs'

const redisPath = '/tmp/redis'

const client = {
  set(key: string, value: string) {
    // 如果文件夹不存在，创建文件夹
    if (!fs.existsSync(redisPath)) {
      fs.mkdirSync(redisPath)
    }
    fs.writeFileSync(`${redisPath}/${key}.txt`, value, { encoding: 'utf-8' })
  },
  expire(key: string, expires: number) {},
  get(key: string, callback: (err: any, reply: string) => void) {
    fs.readFile(`${redisPath}/${key}.txt`, { encoding: 'utf-8' }, (err, data) => {
      callback(err, data)
    })
  },
  // 用fs.access来实现是否存在
  exists(key: string, callback: (err: any, number: number) => void) {
    fs.access(`${redisPath}/${key}.txt`, err => {
      callback(err, err ? 0 : 1)
    })
  },
  // 删除
  del(key: string) {
    fs.unlinkSync(`${redisPath}/${key}.txt`)
  },
}

/**
 * 设置一个键值对
 * @param key 键
 * @param value 值
 * @param expires 失效/秒
 */
export function redisSet(key: string, value: string, expires?: number) {
  client.set(key, value)
  expires && client.expire(key, expires)
}

/**
 * 返回指定键的值
 * @param key 键
 * @returns Promise value
 */
export function redisGet(key: string): Promise<string> {
  return new Promise(resolve => {
    client.get(key, function (err, reply) {
      if (err) return resolve('')
      resolve(reply)
    })
  })
}

/**
 * 是否存在键
 * @param key 键
 * @returns boolean
 */
export function redisExists(key: string): Promise<boolean> {
  return new Promise(resolve => {
    client.exists(key, function (err, number) {
      resolve(err ? false : number == 1)
    })
  })
}

/**
 * 删除键
 * @param key 键
 */
export function redisClean(key: string) {
  client.del(key)
}

export default client
