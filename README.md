# Misthin-cli
![npm](https://img.shields.io/npm/dt/misthin-cli)
![npm](https://img.shields.io/npm/v/misthin-cli)
![travis](https://travis-ci.com/BWrong/misthin-cli.svg?branch=master)

## 介绍
MisthinCli为前端开发者提供了一些常用的功能：
- 项目模板：可以下载一些成熟的项目模板，在新项目开始时不必从零开始。
- 部署助手：可以在项目创建配置文件，用于配置部署信息，然后执行部署命令进行项目部署。

## 安装
采用全局安装：
```bash
npm i -g misthin-cli
```
## 常用命令
- 帮助
```bash
misthin -h
```
- 查看版本
```bash
misthin -V
```
- 初始化项目
```bash
## 创建项目
## <name>是创建项目文件的名字
misthin create <name>
```
- 初始化配置信息
```bash
misthin init
```
- 部署
```bash
misthin deploy --mode <mode>
# 或
misthin deploy -m <mode>
## <mode>为项目环境名称
```
```bash
# 部署到所有环境
misthin deploy -m all
```

## 说明
- 下载模板需要使用git，固需要提供相应环境
- 项目名称会作为`package.json`的`name`值，为了防止特殊字符和中文引起的一些问题，目前仅支持`英文`、`数字`和`-_`
- 支持多种环境，默认预备了三个，可以自己按照格式添加
- 构建前可以进行自动打包，**不配置打包命令将跳过打包环节**
- 可以在覆盖服务器上文件前进行备份，便于在新版本有问题时做回滚，**不配置备份目录将跳过备份环节**
- 部署目标位置设置： **会先将该目录删除再将新的文件上传到该处**
- 支持多种登录方式：
  - `ssh-key`: 推荐使用该方式，不过需要服务器支持，设置`ssh-key`相关信息，在添加环境信息时，不设置密码，将使用`ssh-key`进行连接
  - 密码：如果环境信息中设置了密码，将使用密码进行登录
- 除了cli，还可以使用对应软件[MisthinTools](https://github.com/BWrong/misthinTools)