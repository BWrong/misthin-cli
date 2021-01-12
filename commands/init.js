const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { showLogo, checkVersion, logWarn, logSuccess } = require('../utils');
const { configFileName, configPath} = require('../config');
const deployConfig = require('../config/deployConfig');

// 创建JSON对象
const createConfig = (userConfig) => {
  const config = {
    projectName: userConfig.projectName,
    privateKey: userConfig.privateKey,
    passphrase: userConfig.passphrase,
    modes: {}
  };
  userConfig.envList.forEach((item) => (config.modes[item] = ({
    name: userConfig[`${item}Name`],
    script: userConfig[`${item}Script`],
    host: userConfig[`${item}Host`],
    port: userConfig[`${item}Port`],
    username: userConfig[`${item}Username`],
    password: userConfig[`${item}Password`],
    distPath: userConfig[`${item}DistPath`],
    webDir: userConfig[`${item}WebDir`],
    backupDir: userConfig[`${item}BackupDir`]
  })));
  return config;
};

// 创建配置文件
const createConfigFile = (jsonObj) => {
  const str = `module.exports = ${JSON.stringify(jsonObj, null, 2)}`;
  fs.writeFileSync(configPath, str);
};

module.exports = async () => {
  // 显示logo
  showLogo();
  // 检测cli版本
  checkVersion();
  // 1. 是否已存在配置文件
  if (fs.existsSync(configPath)) return logWarn('配置文件' + chalk.magenta(configFileName) + '已存在！');
  const userConfig = await inquirer.prompt(deployConfig);
  createConfigFile(createConfig(userConfig));
  logSuccess(`配置文件${chalk.underline.magenta(configFileName)}生成成功`);
};
