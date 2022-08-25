const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class UserService extends Service {
  get User() {
    return this.app.model.User;
  }

  createToken(data) {
    return jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
  }

  verifyToken(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }

  async findEmail(email) {
    try {
      const dbback = await this.User.findOne({ email }).select('+password');
      return dbback;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async createUser(data) {
    data.password = this.ctx.helper.md5(data.password);
    try {
      const dbback = await new this.User(data).save();
      return dbback;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

module.exports = UserService;
