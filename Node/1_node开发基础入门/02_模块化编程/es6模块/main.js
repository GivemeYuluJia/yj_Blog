import defaultModule, { module } from "./esModule.js";
/**
 *  node默认不支持es6模块 
 *  解决
 *    - 文件后缀名改为ejs
 *    - 在package.json完成type: module配置
 * 
 *  es6模块输出的是值的引用，一个只读引用
 */
console.log(defaultModule, '——', module);