const download = require('download-git-repo');
const symbols = require('log-symbols');
const ora = require('ora');
const chalk = require('chalk');
module.exports = function (remote, name, option) {
    const downSpinner = ora('正在下载模板...').start();
    return new Promise((resolve, reject) => {
        download(remote, name, option, err => {
            if (err) {
                downSpinner.fail();
                console.log(symbols.error, chalk.red(err));
                reject(err);
                return;
            };
            downSpinner.succeed(chalk.green('模板下载成功！'));
            resolve();
        });
    });
  };
