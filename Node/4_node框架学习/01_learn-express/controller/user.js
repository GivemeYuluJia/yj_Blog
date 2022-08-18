const { User } = require("../model/index");
const { createToken } = require("../util/jwt");
const { symbolUserKey } = require("../config/config.default");

// 用户注册
module.exports.register = async (req, res, next) => {
  const model = new User(req.body)
  const dbBack = await model.save()
  const user = dbBack.toJSON();
  delete user.password
  res.status(201).send({
    user
  })
}

// 用户登陆
module.exports.login = async(req, res, next) => {
  // 客户端数据验证
  // 链接数据库
  let dbBack = await User.findOne(req.body);
  if(!dbBack) {
    res.status(402).json({ error: "邮箱或者密码不正确" })
  }
  dbBack = dbBack.toJSON();
  dbBack.token = await createToken({
    username: dbBack.username,
    email: dbBack.email,
    phone: dbBack.phone
  })
  res.status(200).json({user: dbBack})
}

module.exports.lists = async (req, res, next) => {
  res.send({
    user: req[symbolUserKey].userInfo
  })
}