const inquirer = require('inquirer');
const config = require("../../config");

const myAction = async (project, args) => {
  // 命令行的执行逻辑代码
  // console.log(project);
  // console.log(args);

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'framwork',
      choices: config.framwork,
      message: '请选择你所使用的框架'
    }
  ])
  console.log(answer);
};

module.exports = myAction;