const fs = require('fs');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const { showLogo, checkGit, checkVersion, logWarn, logError, logSuccess, gitClone, notify } = require('../utils');
const { projectList, toolName } = require('../config');

// 要删除的目录，相对于根目录
const deleteDir = [];
module.exports = async (name, option) => {
  // 显示logo
  showLogo();
  // 检测cli版本
  checkVersion();
  // 0. 检查控制台是否以运行`git `开头的命令
  if (!checkGit()) return;
  // 1. 是否已存在文件
  if (fs.existsSync(name)) return logWarn(`${name}目录已存在！`);
  // 2. 过滤特殊字符
  if (name.match(/[^A-Za-z0-9_-]/g)) return logError('项目名称存在非法字符！');
  // 3. 用户选择模板
  const TypeQuestions = [
    {
      type: 'list',
      message: '请选择开发框架:',
      choices: Object.keys(projectList),
      name: 'type'
    }
  ];
  const answers = await inquirer.prompt(TypeQuestions);
  const tempList = projectList[answers.type];
  const tempQuestions = [
    {
      type: 'list',
      message: '请选择项目模板:',
      choices: tempList,
      name: 'url'
    }
  ];
  const selectTemp = await inquirer.prompt(tempQuestions);
  // 4. 下载模板
  await gitClone(`direct:${selectTemp.url}`, name, { clone: true });
  // 5. 清理文件
  const pwd = shell.pwd();
  deleteDir.map((item) => shell.rm('-rf', pwd + `/${name}/${item}`));
  // 6. 写入配置文件
  shell.cd(name);
  const cfgSpinner = ora('正在写入配置信息...').start();
  let pkg = fs.readFileSync(`${pwd}/${name}/package.json`, 'utf8');
  pkg = JSON.parse(pkg);
  pkg.name = name;
  pkg.author = '';
  fs.writeFileSync(`${pwd}/${name}/package.json`, JSON.stringify(pkg), { encoding: 'utf8' });
  cfgSpinner.succeed(chalk.green('配置信息写入成功！'));
  // 7. 安装依赖
  const installSpinner = ora('正在安装项目依赖包... \n').start();
  try {
    spawn.sync('npm', ['install', '-depth', '0'], { stdio: 'inherit' });
  } catch (error) {
    logWarn('自动安装依赖包失败，请手动安装！');
    console.log(error);
    installSpinner.fail();
    shell.exit(1);
  }
  installSpinner.succeed(chalk.green('依赖包安装成功！'));
  logSuccess('\n       ♪(＾∀＾●)ﾉ \n\n  ❤   恭喜，项目创建成功  ❤ \n');
  notify(toolName, ' ♪(＾∀＾●)ﾉ 恭喜，项目创建成功！');
  // 8. 打开编辑器
  if (shell.which('code')) shell.exec('code ./');
  shell.exit(0);
};
