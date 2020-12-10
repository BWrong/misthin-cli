const chalk = require('chalk');
const execSync = require('child_process').execSync;
exports.checkVersion = () => {
  let pkg = require('../package.json')
  const pkgName = pkg.name
  const version = pkg.version
  const ltsVersion = execSync(`npm view ${pkgName} version`) + '' // 返回 buffer 转 string
  if (ltsVersion.trim() !== version) console.log(chalk.red(`cli 版本过旧，建议执行 npm i -g ${pkgName}@latest 升级 cli： ${version} -> ${ltsVersion} `))
}