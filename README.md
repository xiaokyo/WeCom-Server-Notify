# lerna+yarn workspace快速上手模版

这是一个快速上手的lerna+yarn workspace来管理npm的模版, 包含以下基础功能

1. commit规范 - 提交记录更有序好看
2. changelog - 自动生成changelog
3. typescript - 开发时代码检查
4. eslint - 代码检查工具
5. prettier - 代码格式工具

### 快速开始

1. 克隆代码

```
git clone git@github.com:xiaokyo/lerna-packages-boilerplate.git
```

2. 进入项目下依赖

```
yarn
```

### 关于git提交

推荐使用下面的命令

```
yarn c
```

会规范你的提交信息, 以便后面生成changelog

### 生成CHANGELOG.md

```
yarn changelog
```

会在项目根目录生成changelog.md文件, 存在的话会叠加, 使用commit记录来生成 

> 注意: 要使用yarn c命令来提交填写提交信息的规范格式才可以生成好看的changelog

