const path = require('path');

module.exports = {
  // 构建目标
  target: 'web',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // 入口文件
  entry: path.resolve(__dirname, '../src/client.js'),
  // 出口文件
  output: {
    filename: 'bundle_client.js',
    path: path.resolve(__dirname, '../dist/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ]
  },
}