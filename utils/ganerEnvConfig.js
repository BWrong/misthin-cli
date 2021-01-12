module.exports = (envList) => {
  return envList.map(({key,title,script}) => [
    {
      type: 'input',
      name: `${key}Name`,
      message: '环境名称',
      default: title,
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'input',
      name: `${key}Script`,
      message: '打包命令',
      default: script,
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'input',
      name: `${key}Host`,
      message: '服务器地址',
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'number',
      name: `${key}Port`,
      message: '服务器端口',
      default: 22,
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'input',
      name: `${key}Username`,
      message: '用户名',
      default: 'root',
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'password',
      name: `${key}Password`,
      message: '密码',
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'input',
      name: `${key}DistPath`,
      message: '本地打包目录',
      default: 'dist',
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'input',
      name: `${key}WebDir`,
      message: '服务器部署目录',
      when: (answers) => answers.envList.includes(key)
    },
    {
      type: 'input',
      name: `${key}BackupDir`,
      message: '服务器备份目录',
      when: (answers) => answers.envList.includes(key)
    },
  ]);
};