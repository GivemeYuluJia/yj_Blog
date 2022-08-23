const mongoose = require("mongoose");
const md5 = require('../util/md5');
const baseModel = require("./baseModel");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false // 只在查询时(不包括新增数据返回)不返回该字段
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  cover:{
    type: String,
    default: null
  },
  channeldes:{
    type: String,
    default: null
  },
  subscribeCount:{
    type:Number,
    default:0
  },
  ...baseModel
})

module.exports = userSchema;