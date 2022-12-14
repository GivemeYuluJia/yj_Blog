const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require('./router/index');

const app = express();

// 解析客户端传入数据格式
app.use(express.json());
app.use(express.urlencoded());
// 处理静态文件
app.use(express.static('public'));
// 跨域
app.use(cors());
// 日志
app.use(morgan('dev'));
// 路由
app.use('/api/v1', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})