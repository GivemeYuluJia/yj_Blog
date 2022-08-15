// file system
const fs = require("fs");

/**
 * 读取文件
 * 第一个参数 path 文件路径 或文件名
 * 第二个参数 读取文件时字符编码
 * 第三个参数 回调函数
 */
fs.readFile('./a.txt', 'utf8', function(err, data) {
  // 失败
  console.log('err', err);
  // 成功
  console.log('success', data);
})