const fs = require('fs');
const os = require('os');
const path = require('path');
const ganerEnvConfig = require('../utils/ganerEnvConfig');
const { envList } = require('./index');
const homePath = os.homedir();
const getProjectName = fs.existsSync(`${path.join(process.cwd())}/package.json`) ? require(`${process.cwd()}/package.json`).name : '';
const [devConfig, prodConfig, testConfig] = ganerEnvConfig(envList);
const getEnvKeysList = envList.reduce((temp, item, index) => {
  temp.push({
    name: `${item.title}(${item.key})`,
    value: item.key,
    checked: index === 0
  });
  return temp;
}, []);
module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
    default: getProjectName
  },
  {
    type: 'input',
    name: 'privateKey',
    message: '请输入本机私钥地址',
    default: `${homePath}/.ssh/id_rsa`
  },
  {
    type: 'password',
    name: 'passphrase',
    message: '请输入本地私钥密码',
    default: ''
  },
  {
    type: 'checkbox',
    name: 'envList',
    message: '请选择需要部署的环境',
    choices: getEnvKeysList
  },
  ...devConfig,
  ...prodConfig,
  ...testConfig
];
