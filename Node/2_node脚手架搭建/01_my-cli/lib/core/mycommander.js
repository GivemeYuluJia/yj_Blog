const myAction = require("./action");

const mycommander = (program) => {
  // 自定义命令
  program.command('create <project> [other...]')
  .alias('crt') // 自定义命令缩写
  .description('创建项目') // 说明
  .action(myAction)
}

module.exports = mycommander;