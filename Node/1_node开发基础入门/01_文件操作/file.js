const fs = require('fs');

/**
 * 追加内容 —— readFile 和 writeFile联合使用
 *
 */
fs.readFile('./a.txt', 'utf8', function(err, data) {
  if(!err) {
    let newData = data + ' Hello World';
    fs.writeFile('./a.txt', newData, function(err, success) {
      if(!err) {
        console.log('追加成功', newData);
      }
    })
  }
})