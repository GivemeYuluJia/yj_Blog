const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const videolikeSchema = new mongoose.Schema({
  like: {
    type: Number,
    enum: [1, -1],
    require: true
  },
  video: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Video"
  },
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User"
  }
})

module.exports = videolikeSchema