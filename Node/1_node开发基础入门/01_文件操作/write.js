const fs = require('fs');

/**
 * 写入文件——会将整个文件清空并替换内容
 * 
 *  接受三个参数
 *    - path 文件路径 或文件名
 *    - 写入内容
 *    - 回调函数
 */
fs.writeFile('./a.txt', '8888', function(err, data) {
  // 成功不会有打印
  console.log('err', err);
  console.log('success', data)
})