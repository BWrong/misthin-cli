const commander = require('commander');
const createAction = require('./commands/create');
const initAction = require('./commands/init');
const deployAction = require('./commands/deploy');

// 查看版本号
commander
    .version(require('./package.json').version)
    .option('-v,--version', '查看版本号');
// 初始化项目
commander
    .command('create <name>')
    .description('创建项目')
    .action(createAction);
// 初始化配置文件
commander
    .command('init')
    // .option('-y, --yes', '全部以默认值创建')
    .description('创建配置文件')
    .action(initAction);
// 部署项目
commander
    .command('deploy')
    .option('-m, --mode <mode>', '部署到指定环境，（dev：开发环境，prod：开发环境，test：测试环境，all: 所有环境[默认]）')
    .description('执行部署任务')
    .action(deployAction);
commander.parse(process.argv);
