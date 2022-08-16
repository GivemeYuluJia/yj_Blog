const fs = require('fs');

module.exports = {
  index(response) {
    fs.readFile('./index.html', 'utf-8', (err, data) => {
      response.write(data);
      response.end();
    })
  },
  user(postData, res) {
    console.log(postData);
  }
}