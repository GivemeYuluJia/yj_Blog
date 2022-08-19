const jwt = require("jsonwebtoken");
const { uuid, symbolUserKey } = require("../config/config.default")

// 验证token 中间件
module.exports.verifyToken = (required = true) => {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    token = token ? token.split('Bearer ')[1] : null;
    if(token) {
      try {
        let userInfo = await jwt.verify(token, uuid);
        req[symbolUserKey] = userInfo;
        next()
      } catch (error) {
        res.status('402').json({ error: '无效的token' })
      }
    } else if(required) {
      res.status(402).json({ error: "请传入token" })
    } else {
      next()
    }
  }
}

// 生成token
module.exports.createToken = async userInfo => {
  const token = await jwt.sign({ userInfo }, uuid, {
    expiresIn: 60 * 60 * 24
  });
  return token;
}