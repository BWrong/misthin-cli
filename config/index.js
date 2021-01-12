const path = require('path');
const toolName = 'MISTHIN';
const configFileName = 'misthin.config.js';
const configPath = `${path.join(process.cwd())}/${configFileName}`;
const projectList = require('./project-list');
const envList = [
  {
    key: 'prod',
    title: '生产环境',
    script: 'npm run build:prod'
  },
  {
    key: 'dev',
    title: '开发环境',
    script: 'npm run build:dev'
  },
  {
    key: 'test',
    title: '测试环境',
    script: 'npm run build:test'
  }
];
module.exports = {
  toolName,
  configFileName,
  configPath,
  projectList,
  envList
};
