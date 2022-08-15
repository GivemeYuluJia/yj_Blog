const download = require("download-git-repo");

download('direct:', '', { clone: true }, (err) => {
  console.log(err)
})