const { User } = require("../model/index");
const fs = require("fs");
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
    id: dbBack._id,
    username: dbBack.username,
    email: dbBack.email,
    phone: dbBack.phone
  })
  res.status(200).json({user: dbBack})
}

// 用户修改信息
module.exports.update = async (req, res, next) => {
  const id = req[symbolUserKey].userInfo.id;
  const updateData = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(202).json({
    user: updateData
  })
}

// 用户上传头像
module.exports.uploadAvatar = async (req, res, next) => {
  console.log(req.file);
  const fileArr = req.file.originalname.split('.');
  const fileType = fileArr[fileArr.length - 1];
  try {
    await fs.renameSync(
      './public/' + req.file.filename,
      './public/' + req.file.filename + '.' + fileType,
    )
    res.status(201).json({ filepath: req.file.filename + '.' + fileType })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}



module.exports.lists = async (req, res, next) => {
  res.send({
    user: req[symbolUserKey].userInfo
  })
}