'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const userBody = this.ctx.request.body;
    this.ctx.validate({
      email: { type: 'string' },
      password: { type: 'string' },
    }, userBody);
    const user = await this.service.user.findEmail(userBody.email);
    if (!user) {
      this.ctx.throw(422, '用户未注册');
    }
    if (this.ctx.helper.md5(userBody.password) !== user.password) {
      this.ctx.throw(422, '密码不正确');
    }
    const token = this.service.user.createToken({
      userInfo: {
        username: user.username,
        id: user.id,
        email: user.email,
      },
    });
    const userinfo = user._doc;
    delete userinfo.password;
    this.ctx.body = {
      ...userinfo,
      token,
    };
  }

  async register() {
    const { ctx, service } = this;
    ctx.validate({
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    });
    const userBody = ctx.request.body;
    if (await service.user.findEmail(userBody.email)) {
      ctx.throw(422, '邮箱已经存在');
    }
    const user = await service.user.createUser(userBody);
    if (user) {
      ctx.body = {
        msg: '注册成功',
        data: user,
      };
    } else {
      ctx.body = {
        msg: '注册失败',
      };
    }
  }

  async subscribe() {
    const { ctx, app } = this;
    const subscribeid = ctx.params.subscribeid;
    const userid = ctx.userInfo.id;
    if (subscribeid === String(userid)) {
      this.ctx.throw(403, '不能关注自己');
    }

    const { Subscribe, User } = app.model;
    const subInfo = await Subscribe.findOne({
      user: userid,
      channel: subscribeid,
    });
    if (subInfo) {
      this.ctx.throw(401, '已经关注');
    }
    const subDb = await new Subscribe({
      user: userid,
      channel: subscribeid,
    }).save();
    if (subDb) {
      const subscribeUser = await User.findById(subscribeid);
      subscribeUser.subscribeCount++;
      await subscribeUser.save();
      this.ctx.body = subscribeUser;
    } else {
      this.ctx.throw(401, '关注失败');
    }
  }

  async userInfo() {
    const { ctx, app } = this;
    const registerUserid = ctx.user ? ctx.user._id : null;
    const userid = ctx.params.userid;
    const { Subscribe, User } = app.model;
    let isSubscribe = false;
    if (registerUserid) {
      const subscribe = await Subscribe.findOne({
        user: registerUserid,
        channel: userid,
      });
      if (subscribe) {
        isSubscribe = true;
      }
    }

    const userInfoDb = await User.findById(userid);
    const userInfo = userInfoDb._doc;
    userInfo.isSubscribe = isSubscribe;
    ctx.body = userInfo;
  }
}

module.exports = UserController;
