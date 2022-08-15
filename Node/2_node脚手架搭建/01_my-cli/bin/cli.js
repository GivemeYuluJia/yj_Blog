#! /Users/edy/.nvm/versions/node/v16.13.1/bin/node

/**
 *  这个文件需要用到该操作系统下面环境变量中node运行该代码
 */

const { program } = require("commander");
const myHelp = require("../lib/core/help");
const mycommander = require("../lib/core/mycommander");
// console.log('mycli');
// console.log(process.argv)

myHelp(program);
mycommander(program);

// 接收命令行所有选项
program.parse(process.argv)