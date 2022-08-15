#! /Users/edy/.nvm/versions/node/v16.13.1/bin/node

/**
 *  这个文件需要用到该操作系统下面环境变量中node运行该代码
 */

 const { program } = require("commander");
 // console.log('mycli');
 // console.log(process.argv)
 
 // 定义命令行选项
 program.option('-f --framwork <framwork>', '设置框架');
 
 // 自定义命令
 program.command('create <project> [other...]')
 .alias('crt') // 自定义命令缩写
 .description('创建项目') // 说明
 .action((project, args) => {
   // 命令行的执行逻辑代码
   console.log(project);
   console.log(args);
 })
 
 // 接收命令行所有选项
 program.parse(process.argv)