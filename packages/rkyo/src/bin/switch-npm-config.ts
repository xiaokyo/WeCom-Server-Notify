/**
 * @description 简单的两个配置文件替换(忽略,)
 */

import { getHomePath, readFileSync, writeFileSync } from '@/common'

const start = () => {
  const USER_HOME = getHomePath()

  const NPMRC_PATH = USER_HOME + '/.npmrc'
  const NPMRCBC_PATH = USER_HOME + '/.npmrc-backup'
  const YARNRC_PATH = USER_HOME + '/.yarnrc'
  const YARNRCBC_PATH = USER_HOME + '/.yarnrc-backup'

  const npmrc = readFileSync(NPMRC_PATH)
  const npmrcBc = readFileSync(NPMRCBC_PATH)
  const yarnrc = readFileSync(YARNRC_PATH)
  const yarnrcBc = readFileSync(YARNRCBC_PATH)

  writeFileSync(NPMRC_PATH, npmrcBc)
  writeFileSync(NPMRCBC_PATH, npmrc)
  writeFileSync(YARNRC_PATH, yarnrcBc)
  writeFileSync(YARNRCBC_PATH, yarnrc)
}

export default () => {
  return [
    {
      command: 'registry-change',
      description: '.npmrc和.npmrc-backup互相替换, .yarnrc和.yarnrc-backup互相替换',
      action() {
        start()
      },
    },
  ]
}
