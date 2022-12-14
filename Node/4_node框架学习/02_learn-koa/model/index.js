const mongoose = require("mongoose");

const { mongoPath } = require("../config/config.default");

async function main () {
  await mongoose.connect(mongoPath)
}
main()
.then(res => {
  console.log('mongoose θΏζ₯ζε')
})
.catch(err => {
  console.log(err)
})

module.exports = {
  User: mongoose.model('User', require('./userModel')),
  Video: mongoose.model('Video', require('./videoModel')),
  Subscribe: mongoose.model('subscribe', require('./subscribeModel')),
  Videocomment: mongoose.model('Videocomment', require('./videocommentModel')),
  Videolike: mongoose.model('Videolike', require('./videolikeModel'))
}