const Generator = require('yeoman-generator');
class MisthinGenerator extends Generator {
  constructor(params, opts) {
    super(params, opts);
    console.log(111);
    this.argument('name', { type: String, required: true, description: '项目名称' });
    this.option('dev', { alias: 'd', default: false, description: '获取开发分支' });
    this.branch = 'master';
    this.helperMethod = function () {
      // 私有方法，不会被当成任务
      console.log("won't be called automatically");
    };
  }
  // 初始化，获取配置状态
  initializing() {
    this.log('初始化');
    this.log(this.options.name);
    this.log(this.options.dev);
    this.log(this.destinationRoot()); // 获取路径
    this.log(this.contextRoot); // 获取路径
    this.log(this.sourceRoot()); // 获取模板路径
  }
  // 获取用户输入 this.prompt()
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?'
        // store: true
      }
    ]);
  }
  // 保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
  configuring() {}
  // 如果方法名称与优先级不匹配，它将被推送到该组
  default() {}
  //  在其中写入生成器特定文件（路由，控制器等）的位置
  writing() {
    this.log('cool feature', this.answers.name, this.answers.cool);
    // this.fs.copyTpl( // 复制文件,ejs语法
    //   this.templatePath('index.html'),
    //   this.destinationPath('public/index.html'),
    //   { title: 'Templating with Yeoman' }
    // );
  }
  // -处理冲突的地方（内部使用）
  conflicts() {}
  // -运行安装的位置（npm，凉亭）
  install() {
    this.npmInstall('', {}, { cwd: this.destinationPath(this.options.name) });
  }
  // -最后一次打扫，打扫，说再见等
  end() {
    // this.spawnCommand('code', ['./']);
  }
  _private_method() {
    // 私有方法，不会被当成任务
    console.log('private hey');
  }
}
module.exports = MisthinGenerator;
