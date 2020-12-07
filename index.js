
const commander = require('commander');
const createAction = require('./commands/create');

// 查看版本号
commander
    .version(require('./package.json').version)
    .option('-v,--version', '查看版本号');
// 初始化项目
commander
    .command('create <name>')
    // .option('-d, --dev', '获取develop分支')
    .description('创建项目')
    .action(createAction);

commander.parse(process.argv);
