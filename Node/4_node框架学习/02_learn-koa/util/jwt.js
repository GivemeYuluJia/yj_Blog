const jwt = require("jsonwebtoken");
const { symbolUserKey } = require("../config/config.default")

module.exports.verifyToken = (required = true) => {
  return async (ctx, next) => {
    let token = ctx.headers.authorization;
    token = token ? token.split('Bearer ')[1] : null;
    if(token) {
      try {
        let userInfo = await jwt.verify(token, 'koa-jwt');
        ctx[symbolUserKey] = userInfo;
        await next()
      } catch (error) {
        ctx.throw(402,error)
      }
    } else if(required) {
      ctx.throw(402,'无效的token')
    } else {
      await next()
    }
  }
}

module.exports.createToken = async (userInfo) => {
  const token = await jwt.sign({userInfo}, 'koa-jwt', {
    expiresIn: 60 * 60 * 24
  })
  return token;
}