const { body } = require("express-validator");
const validate = require('./errorBack');
const { User } = require('../../model/index')
/**
 * 自定义验证器可以通过使用链方法来实现.custom()。
 * 自定义验证器可以返回 Promises 以指示异步验证（将等待），或throw任何值/拒绝使用自定义错误消息的承诺。
 *  */ 
module.exports.register = validate([
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空'),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val => {
      const emailValidate = await User.findOne({ email: val })
      if (emailValidate) {
        return Promise.reject('邮箱已被注册')
      }
    }).bail(),
  body('phone')
    .notEmpty().withMessage('手机号不能为空').bail()
    .custom(async val => {
      const phoneValidate = await User.findOne({ phone: val })
      if (phoneValidate) {
        return Promise.reject('手机号已被注册')
      }
    }).bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
    .isLength({ min: 5 }).withMessage('用户名长度不能小于5').bail(),
])

module.exports.login = validate([
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val => {
      const emailValidate = await User.findOne({ email: val })
      if (!emailValidate) {
        return Promise.reject('邮箱未注册')
      }
    }).bail(),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
])

module.exports.update = validate([
  body('email')
    .custom(async val => {
      const emailValidate = await User.findOne({ email: val })
      if (emailValidate) {
        return Promise.reject('邮箱已经被注册')
      }
    }).bail(),
  body('username')
    .custom(async val => {
      const nameValidate = await User.findOne({ username: val })
      if (nameValidate) {
        return Promise.reject('用户已经被注册')
      }
    }).bail(),
    body('phone')
    .custom(async val => {
      const phoneValidate = await User.findOne({ phone: val })
      if (phoneValidate) {
        return Promise.reject('手机已经被注册')
      }
    }).bail(),
])