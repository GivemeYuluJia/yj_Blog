const ora = require("ora");

const spinner = ora().start();

spinner.text = 'loading...';

setTimeout(() => {
  console.log('1111');
  spinner.succeed('结束')
}, 3000)