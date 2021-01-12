const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const updateNotifier = require('update-notifier');
const notifier = require('node-notifier');
const { textSync } = require('figlet');
const shell = require('shelljs');
const { toolName, configFileName, configPath } = require('../config');
const cliPkg = require('../package.json');
// 显示slogan
function showLogo() {
  logMagent(textSync(toolName, { font: '3D-ASCII' }));
}
// 检查git是否可用
function checkGit() {
  if (shell.which('git')) return true;
  logError('Git不可用，请安装Git后再试！');
}
// 检查版本
function checkVersion() {
  const upNotifier = updateNotifier({ pkg: cliPkg, updateCheckInterval: 0 });
  upNotifier.notify({ isGlobal: true, defer: false });
  return upNotifier.update;
}
// 紫色log
function logMagent(...txt) {
  console.log(chalk.magenta(...txt));
}
// 普通log
function logNormal(...txt) {
  console.log(...txt);
}
// 信息类log
function logInfo(...txt) {
  ora().info(chalk.blue(...txt));
}
// 成功log
function logSuccess(...txt) {
  ora().succeed(chalk.green(...txt));
}
// 警告类log
function logWarn(...txt) {
  ora().warn(chalk.yellow(...txt));
}
// 错误log
function logError(...txt) {
  ora().fail(chalk.red(...txt));
}
// 下划线
function logUnderline(txt) {
  return chalk.underline.blueBright.bold(txt);
}
// 检查node版本
function checkNodeVersion() {}
// 检查配置文件是否存在
function checkHasConfigFile() {
  if (!fs.existsSync(configPath)) {
    logWarn('错误:配置文件' + chalk.magenta(configFileName) + '不存在，请先执行' + chalk.magenta('misthin init') + '命令创建');
    process.exit(1);
  }
}
function checkConfigCorrect(config) {
  const rules = {
    name: (val) => /\S+/.test(val),
    host: (val) => /\S+/.test(val),
    port: (val) => /\d+/.test(val),
    username: (val) => /\S+/.test(val),
    distPath: (val) => /[^/]/.test(val),
    webDir: (val) => /[^/]+/.test(val)
  };
  Object.keys(rules).forEach((key) => {
    if (!rules[key](config[key])) {
      logError(`错误: ${chalk.magenta(`[${config.name}]`)} - ${chalk.magenta(`${key}`)} 配置不正确`);
      process.exit(1);
    }
  });
}
// git clone
function gitClone(remote, name, option) {
  const downSpinner = ora('正在下载模板...').start();
  return new Promise((resolve, reject) =>
    download(remote, name, option, (err) => {
      if (err) {
        downSpinner.fail();
        logError(err);
        return reject(err);
      }
      downSpinner.succeed(chalk.green('模板下载成功！'));
      resolve();
    })
  );
}
// 系统通知
function notify(title, message) {
  notifier.notify({
    title,
    icon: path.join(__dirname, '../assets/logo.png'),
    message,
    contentImage: path.join(__dirname, '../assets/logo.png'),
    sound: true
  });
}
function formatTimestamp(time = 0, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (time === 0 || !time) {
    return '';
  }

  let date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      );
    }
  }
  return fmt;
}
module.exports = {
  showLogo,
  checkGit,
  checkVersion,
  logMagent,
  logNormal,
  logInfo,
  logSuccess,
  logWarn,
  logError,
  logUnderline,
  gitClone,
  notify,
  checkHasConfigFile,
  checkConfigCorrect,
  formatTimestamp
};
