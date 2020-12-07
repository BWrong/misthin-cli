const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const figlet = require('figlet');
const notifier = require('node-notifier');
const clone = require('../utils/clone.js');
const { projectList } = require('../config')
let branch = 'master';
// 要删除的目录，相对于根目录
const deleteDir = [];
const initAction = async (name, option) => {
  console.log(figlet.textSync('MISTHIN CLI'));
  // 0. 检查控制台是否以运行`git `开头的命令
  if (!shell.which('git')) {
    console.log(symbols.error, '对不起，git命令不可用！');
    shell.exit(1);
  }
  // 1. 验证输入name是否合法
  if (fs.existsSync(name)) {
    console.log(symbols.warning, `已存在项目文件夹${name}！`);
    return;
  }
  // 过滤特殊字符
  if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
    console.log(symbols.error, '项目名称存在非法字符！');
    return;
  }
  // 2. 获取option，设置拉取分支
  if (option.dev) branch = 'develop';
  // 3. 询问用户配置
  const TypeQuestions = [
    {
      type: 'list',
      message: '请选择开发框架:',
      choices: Object.keys(projectList),
      name: 'type'
    }
  ];
  const answers = await inquirer.prompt(TypeQuestions);
  const tempList = projectList[answers.type]
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
  await clone(`direct:${selectTemp.url}#${branch}`, name, { clone: true });
  // 5. 清理文件
  const pwd = shell.pwd();
  deleteDir.map(item => {
    shell.rm('-rf', pwd + `/${name}/${item}`);
  });
  // 6. 写入配置文件
  shell.cd(name);
  const cfgSpinner = ora('正在写入配置信息...').start();
  let pkg = fs.readFileSync(`${pwd}/${name}/package.json`, 'utf8');
  pkg = JSON.parse(pkg);
  pkg.name = name;
  delete pkg.author;
  fs.writeFileSync(`${pwd}/${name}/package.json`, JSON.stringify(pkg), { encoding: 'utf8' });
  cfgSpinner.succeed(chalk.green('配置信息写入成功！'));
  // 7. 安装依赖
  const installSpinner = ora('正在安装依赖...').start();
  if (shell.exec('npm install').code !== 0) {
    console.log(symbols.warning, chalk.yellow('自动安装失败，请手动安装！'));
    installSpinner.fail();
    shell.exit(1);
  }
  installSpinner.succeed(chalk.green('依赖安装成功！'));
  console.log(
    symbols.success,
    chalk.green('\n       ♪(＾∀＾●)ﾉ \n\n  ❤   恭喜，项目创建成功  ❤ \n')
  );
  notifier.notify({
    title: 'Misthin-cli',
    icon: path.join(__dirname, 'coulson.png'),
    message: ' ♪(＾∀＾●)ﾉ 恭喜，项目创建成功！'
  });
  // 8. 打开编辑器
  if (shell.which('code')) shell.exec('code ./');
  shell.exit(1);
};
module.exports = initAction;
