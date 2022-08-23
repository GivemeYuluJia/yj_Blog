const mongoose = require("mongoose");

const baseModel = require('./baseModel');

const subscribeSchema = new mongoose.Schema({
  // 本人
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  // 关注的用户
  channel: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  ...baseModel
})

module.exports = subscribeSchema;