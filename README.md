# lerna+yarn workspace+monorepo管理多npm包

### 写在开头

这是一遍记录帖, 记录lerna+yarn workspace遇到的一些小问题及使用

### 初始化

```bash
mkdir lerna-repo && cd lerna-repo
```

### lerna生成

```bash
npx lerna init
```

运行后的结构如下

```
lerna-repo/
  packages/
  package.json
  lerna.json
```

#### lerna.json

```json
{
  "packages": [
    "packages/*"
  ],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent",
  "command": {
    "publish": {
      "ignoreChanges": [
        "*.md"
      ],
      "message": "chore(release): publish",
      "registry": "http://192.168.4.91:7001"
    },
    "create": {}
  }
}
```

### package.json

```json
{
  "name": "root",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "cross-env": "^7.0.3",
    "lerna": "^4.0.0"
  }
}
```

### 常用命令

```bash
yarn workspace <package name> add react
```

给某个package添加依赖react

```
lerna clean
```

清理package里所有的node_modules

```
yarn create @cckj/mf-tools
```

按步骤创建package

```bash
lerna run --stream --sort build
```

拓扑排序, 依赖会按照顺序来build对应包

```bash
yarn add -W -D cz-lerna-changelog
```

给root的package.json添加一个依赖

```
lerna publish patch --yes
```

发布npm包且版本加一

patch代表自增 1.0.0 => 1.0.1

```bash
lerna add --scope=@cckj/mf-webpack-base @cckj/mf-types -D
```

将内部依赖加入指定包拓扑排序就可以有序列的运行

### package中的maintainers字段

```json
{
	"maintainers": ["xiaokyo"]
}
```

维护者(maintainers)字段不配置的时候会导致无法publish

### 可能你还需要changelog

可以规范提交来达到changelog的自动生成

```bash
yarn add -W -D commitizen cz-lerna-changelog @commitlint/cli @commitlint/config-conventional husky
```

```package.json```添加如下代码

```
"config": {
    "commitizen": {
      "path": "./node_modules/cz-lerna-changelog"
    }
  },
  "scripts": {
  	"commit-msg":"commitlint -e -V"
  }
```

添加```commitlint.config.js```

```javascript
const fs = require('fs')

/**
 * 获取packages下的包名当作scopes
 * @returns scopes
 */
function getScopeEnum() {
  const dirs = fs.readdirSync('./packages') || []
  dirs.unshift('root')
  return dirs
}

module.exports = {
  extents: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'scope-enum': [2, 'always', getScopeEnum()],
    'scope-empty': [2, 'never'],
  },
}
```

husky添加一个命令

```
npx husky add .husky/commit-msg "yarn commit-msg"
```

上面代码添加了一个commit时的hook规范提交检查

### 注意

> 发布前要登录npm

或者配置npm => token