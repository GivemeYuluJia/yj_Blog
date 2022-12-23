const removeImports = require('next-remove-imports')();

// 配置环境变量
const NODE_ENV = process.env.NODE_ENV;
let COOKIE_NAME = '', SESSION_PASSWORD = '';
if (NODE_ENV === 'development') {
  COOKIE_NAME = 'sid';
  SESSION_PASSWORD = 'MQT9kzifBu7UIuebk3lpTuFNumfd4geA';
} 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['image.baidu.com']
  // },
  env: {
    NEXT_PUBLCI_SESSION_COOKIE_NAME: COOKIE_NAME,
    NEXT_PUBLCI_SESSION_PASSWORD: SESSION_PASSWORD
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = removeImports(nextConfig)
