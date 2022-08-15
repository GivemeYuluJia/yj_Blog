const myHelp = (program) => {
  // 定义命令行选项
  program.option('-f --framwork <framwork>', '设置框架');
}

module.exports = myHelp;