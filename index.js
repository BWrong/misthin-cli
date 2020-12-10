
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
// var yeoman = require('yeoman-environment');
// const base = require('./index1')
// var env = yeoman.createEnv();
// var generatorPath = require.resolve('generator-misthin','misthin:app');
// env.registerStub(generatorPath, 'misthin:app');
// env.run('misthin:app', {'skip-install': true}, function (err) {
//     console.log('done');
// });
