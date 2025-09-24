/**
 * @description git操作 release
 */

import prompts from 'prompts'
import { execSync, exec } from 'child_process'
import chalk from 'chalk'
import gitEmoji from '@/const/git-emoji'
import path from 'path'
import fs from 'fs'

// 表情集合
const emojis = gitEmoji

// 输入集合
const promptsConfig = [
  {
    type: 'text',
    name: 'commitMessage',
    message: '请输入提交信息',
  },
  {
    type: 'select',
    name: 'emoji',
    message: '选择表情',
    choices: emojis.map(_ => ({
      title: `${_.icon} ${_.code} ${_.desc}`,
      value: _.code,
    })),
    initial: 0,
  },
]

/** 获取当前分支名 */
const getCurrentBranch = () =>
  execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')

const push = async (skip = false) => {
  if (skip) return pushBranch()
  const input = await prompts(promptsConfig)
  // 获取当前分支名
  const currentBranchName = getCurrentBranch()

  const { commitMessage, emoji, force } = input

  // 不满足条件不操作
  if (!commitMessage || !emoji || emoji === 'undefined' || commitMessage === 'undefined') return

  try {
    execSync('git add .')
    execSync(`git commit -m ` + `"${emoji} ${commitMessage}"`)

    let pushCmd = `git push origin ${currentBranchName}`
    if (force) pushCmd = pushCmd.replace('push origin', `push -f origin`)
    execSync(pushCmd)
  } catch (e) {
    console.log(chalk.red(e))
  }
}

/**
 * 删除已合并至master的分支
 */
const delMergeBranch = mainBranchName => {
  try {
    const mergedBranchs = execSync('git branch --merged')
      .toString()
      .replace(/\*/gm, '')
      .replace(/master/, '')
      .replace(/release/, '')
      .split(/\n/)
      .map(_ => _.trim())
      .filter(_ => _)
    execSync(`git checkout ${mainBranchName}`)
    if (mergedBranchs.length <= 0) throw new Error('no merged branchs')
    for (const branchName of mergedBranchs) {
      if (branchName == 'master' || branchName == 'release') continue
      try {
        execSync(`git branch -D ${branchName}`)
        console.log(chalk.green(`${branchName} branch has del success`))
      } catch (e) {
        console.log(e.message)
      }
    }
  } catch (e) {
    console.log(chalk.red(e))
  }
}

/**
 * 删除已经合并到release的分支
 */
const delMergeToReleaseBranch = (mainBranchName = 'release') => {
  // 判断有没有该主分支，没有就不操作
  const branchs = execSync('git branch')
    .toString()
    .replace(/\*/gm, '')
    .split(/\n/)
    .map(_ => _.trim())
    .filter(_ => _)
  if (!branchs.includes(mainBranchName)) {
    console.log(chalk.red(`no ${mainBranchName} branch`))
    delMergeToReleaseBranch('master')
    return
  }
  delMergeBranch(mainBranchName)
}

const lookBranchsDesc = (branch = '', desc = '') => {
  const branchs = execSync('git branch')
    .toString()
    .replace(/\*/gm, '')
    .split(/\n/)
    .map(_ => _.trim())
    .filter(_ => _)

  const maxLen = branchs.reduce((max, cur) => {
    if (max < cur.length) return cur.length
    return max
  }, 0)

  if (desc !== '') {
    // 增加描述
    let currentBranchName = getCurrentBranch()
    if (branch !== '') {
      currentBranchName = branch
    }
    execSync(`git config branch.${currentBranchName}.description ${desc}`)
  } else {
    branchs.forEach(_ => {
      try {
        const spaceLen = maxLen - _.length + 1
        // 生成spaceLen个空格字符
        const space = new Array(spaceLen).fill(' ').join('')
        exec(`git config branch.${_}.description`, (err, stdout, stderr) => {
          console.log(`${_}${space}${stdout ? '-- ' + stdout.trim().replace(/\r\n/g, '') : ''}`)
        })
      } catch (e) {
        console.error(`错误了: ${_}`, e)
      }
    })
  }
}

const pushBranch = () => {
  const currentBranchName = getCurrentBranch()
  exec(`git push origin ${currentBranchName}`, function (err, stdout, stderr) {
    if (err) {
      console.log(chalk.red(err || stderr))
    } else {
      console.log(chalk.green(stdout))
    }
  })
}

const pullBranch = rebase => {
  const currentBranchName = getCurrentBranch()
  const pullCmd = rebase
    ? `git pull -r origin ${currentBranchName}`
    : `git pull origin ${currentBranchName}`
  exec(pullCmd)
}

/**
 * new tag and push
 * @returns void
 */
const newTagPush = () => {
  const pkg = require(path.resolve('.', 'package.json'))
  console.log(pkg.version)
  const { version } = pkg
  if (!version) throw new Error('version is required in package.json')
  const tagArr = version.split('.')
  if (tagArr.length !== 3) throw new Error('version must like 1.0.0')
  const last = tagArr[tagArr.length - 1]
  if (Number(last) >= 9) {
    tagArr[tagArr.length - 1] = 0
    const lastSecond = Number(tagArr[tagArr.length - 2]) + 1
    if (Number(lastSecond) >= 9) {
      tagArr[tagArr.length - 2] = 0
      tagArr[0] = Number(tagArr[0]) + 1
    } else {
      tagArr[tagArr.length - 2] = lastSecond
    }
  } else {
    tagArr[tagArr.length - 1] = Number(tagArr[tagArr.length - 1]) + 1
  }

  const newVersion = tagArr.join('.')
  pkg.version = newVersion
  fs.writeFileSync(path.resolve('.', 'package.json'), JSON.stringify(pkg, null, 2))

  execSync('git add .')
  execSync(`git commit -m "tag: ${newVersion}"`)
  execSync(`git tag ${newVersion}`)
  execSync(`git push origin ${newVersion}`)
  const currentBranchName = getCurrentBranch()
  execSync('git push origin ' + currentBranchName)
}

export default () => {
  return [
    {
      command: 'git-push [skip]',
      description: 'git push规范提交',
      action(skip) {
        push(!!skip)
      },
    },
    {
      command: 'git-del [mainBranchName]',
      description: '删除合并过的分支',
      action(mainBranchName = 'release') {
        delMergeToReleaseBranch(mainBranchName)
      },
    },
    {
      command: 'git-tag',
      description: '新建一个tag, package.json patch递增, 并提交到远程',
      action() {
        newTagPush()
      },
    },
    {
      command: 'git-desc [branch] [desc]',
      description: '查看分支的描述集合',
      action(branch = '', desc = '') {
        lookBranchsDesc(branch, desc)
      },
    },
    {
      command: 'git-pull [rebase]',
      description: '拉取分支',
      action(rebase = false) {
        pullBranch(rebase)
      },
    },
  ]
}
