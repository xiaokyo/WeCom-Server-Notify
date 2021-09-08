/**
 * @description 文件目录操作封装
 */

import fs from 'fs'
import path from 'path'

/** 获取用户根目录磁盘目录 */
export const getHomePath = () => {
  const USER_HOME = process.env.HOME || process.env.USERPROFILE
  return USER_HOME
}

/** 同步读文件内容 */
export const readFileSync = filename => {
  return fs.readFileSync(filename, { encoding: 'utf-8' })
}

/** 同步写文件内容 */
export const writeFileSync = (filename, content) => {
  fs.writeFileSync(filename, content, { encoding: 'utf-8' })
}

/** 是否存在文件 */
export const exitsFileSync = (filename: string) => {
  return fs.existsSync(filename)
}

/** 获取当前运行目录下的文件 */
export const getRunPath = filepath => {
  return path.resolve('.', filepath)
}
