/** node核心模块 创建http服务器 */
const http = require("http");
const router = require('./router');

// 通过createServer获取服务器的实例对象
const server = http.createServer();
server.listen(8080, function() {
  console.log('http://127.0.0.1:8080')
})

server.on('request', (request, response) => {
  // response.setHeader('Content-type', 'text/plain;charset=utf-8');
  // console.log('request 666');
  // response.write('你好');
  // response.end();
  router(request, response);
})