const path = require('path');
const webpackExternals = require('webpack-node-externals')
module.exports = {
  // 构建目标
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // 入口文件
  entry: path.resolve(__dirname, '../src/server.js'),
  // 出口文件
  output: {
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, '../dist')
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
  externals: [webpackExternals()],
}