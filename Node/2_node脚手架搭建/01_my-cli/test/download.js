const download = require("download-git-repo");

download('direct:https://github.com/koajs/koa.git', './xxx', { clone: true }, (err) => {
  console.log(err, 'err')
})