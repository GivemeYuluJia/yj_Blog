const fs = require('fs');
const url = require('url');
const controller = require('./controller');

module.exports = (request, response) => {
  if(request.method === 'GET') {
    console.log(url.parse(request.url, true))
    if(request.url === '/') {
      controller.index(response)
    } else {
      fs.readFile('./img.png', (err, data) => {
        response.end(data);
      })
    }
  } else if( request.method === 'POST') {
    let data = '';
    request.on('data', (d) => {
      data += d;
    })
    request.on('end', () => {
      controller.user(require('querystring').parse(data), response)
    })
  }
}