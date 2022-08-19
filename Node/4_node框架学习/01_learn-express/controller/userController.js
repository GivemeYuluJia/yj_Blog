const fs = require("fs");
const url = require('url');
const { User, Subscribe } = require("../model/index");
const { createToken } = require("../util/jwt");
const { symbolUserKey } = require("../config/config.default");

module.exports.getChannel = async (req, res, next) => {
  const { pageNum = 1, pageSize = 10 } = url.parse(req.url, true).query;
  const list = await Subscribe.find({
    channel: req[symbolUserKey].userInfo.id
  })
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize)
  .populate('user', 'id username subscribeCount')
  const channelList = list.map(item => item.user);
  const total = await Subscribe.countDocuments({channel: req[symbolUserKey].userInfo.id});
  res.status(200).json({ data: {
    list: channelList,
    total
  } })
}

// 获取关注列表
module.exports.getSubscribe = async (req, res, next) => {
  const { pageNum = 1, pageSize = 10 } = url.parse(req.url, true).query;
  const list = await Subscribe.find({
    user: req.params.userId
  })
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize)
  .populate('channel', 'id username subscribeCount')
  const subscribeList = list.map(item => item.channel);
  const total = await Subscribe.countDocuments({user: req.params.userId});
  res.status(200).json({ data: {
    list: subscribeList,
    total
  } })
}

// 获取用户信息
module.exports.getUser = async (req, res, next) => {
  let isSubscribe = false;
  // 判断当前是否登陆
  if(req[symbolUserKey]) {
    const record = await Subscribe.findOne({
      user: req[symbolUserKey].userInfo.id,
      channel: req.params.userId
    })
    if(record) {
      isSubscribe = true
    }
  } 
  const user = await User.findById(req.params.userId);
  const result = {
    username: user.username,
    id: user.id,
    isSubscribe,
    subscribeCount: user.subscribeCount
  }
  res.status(200).json({ user: result })
}

// 用户取消关注
module.exports.unsubscribe = async (req, res, next) => {
  const userId = req[symbolUserKey].userInfo.id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ err: '不能取消关注自己' })
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  });
  if(record) {
    await record.remove();
    const user = await User.findById(channelId);
    user.unsubscribe--;
    await user.save();
    res.status(200).json({ msg: "取消关注" })
  } else {
    res.status(401).json({ err: "没有关注此用户" })
  }
}

// 用户关注
module.exports.subscribe = async ( req, res, next) => {
  // 不能关注自己
  const userId = req[symbolUserKey].userInfo.id;
  const channelId = req.params.userId;
  if(userId === channelId) {
    return res.status(401).json({ err: '不能关注自己' })
  }
  // 查看当前用户是否关注
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })
  console.log(record, 'record')
  if(!record) {
    await new Subscribe({
      user: userId,
      channel: channelId
    }).save();

    const user = await User.findById(channelId);
    user.subscribeCount++;
    await user.save();
    res.status(201).json({ msg: "关注成功" })
  } else {
    res.status(401).json({ err: "已经关注此用户" })
  }
}

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