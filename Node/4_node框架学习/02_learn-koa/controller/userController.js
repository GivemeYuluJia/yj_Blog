const { User, Subscribe } = require("../model/index"); 
const { createToken } = require("../util/jwt");
const { symbolUserKey } = require("../config/config.default")

module.exports.register = async (ctx) => {
  console.log('login 111 ')
  const dbback = await new User(ctx.request.body).save();
  const user = dbback.toJSON();
  delete user.password;
  ctx.body = user;
}

module.exports.login = async (ctx) => {
  let dbback = await User.findOne(ctx.request.body);
  if(!dbback) {
    return ctx.throw({ error: "邮箱或者密码不正确" })
  }
  // console.log({...dbback}, 'db')
  const token = await createToken({
    id: dbback._id,
    username: dbback.username,
    email: dbback.email,
    phone: dbback.phone
  });
  dbback._doc.token = token
  ctx.body = dbback._doc;
}

module.exports.getUser = async (ctx) => {
  const userId = ctx.request.params.userid;
  const registerUserid = ctx[symbolUserKey] ? ctx[symbolUserKey].userInfo.id : null;
  let isSubcribed = false;
  if (registerUserid) {
    const subscribe = await Subscribe.findOne({
      user: registerUserid,
      channel: userId
    })
    if (subscribe) {
      isSubcribed = true
    }
  }
  console.log(userId)
  const userInfoDb = await User.findById(userId, [
    "username",
    "id",
    "subscribeCount"
  ]);
  console.log(userInfoDb)
  var userinfo = userInfoDb._doc
  userinfo.isSubcribed = isSubcribed
  ctx.body = userinfo;
}

module.exports.subscribe = async ctx => {
  const subscribeId = ctx.request.params.subscribeid;
  const userId = ctx[symbolUserKey].userInfo.id;
  if (subscribeId == userId) {
    return ctx.throw(403, '不能关注自己')
  }

  const subinfo = await Subscribe.findOne({
    user: userId,
    channel: subscribeId
  })
  if (subinfo) {
    return ctx.throw(403, '已经关注了')
  }

  const subDb = await new Subscribe({
    user: userId,
    channel: subscribeId
  }).save();
  if(subDb) {
    const subcribeUser = await User.findById(subscribeId, [
      "username",
      "image",
      "cover",
      "channeldes",
      "subscribeCount"
    ])

    subcribeUser.subscribeCount++
    await subcribeUser.save()
    ctx.body = subcribeUser
  } else {
    ctx.throw(501, '关注失败')
  }
}

module.exports.subscribeList = async ctx => {
  const userId = ctx[symbolUserKey].userInfo.id;
  console.log(userId, 'uiiu')
  const list = await Subscribe.find({ user: userId })
    .populate('channel', [
      "username",
      "id",
      "subscribeCount"
    ]);
  ctx.body = list;
}