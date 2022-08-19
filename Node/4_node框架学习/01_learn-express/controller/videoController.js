const { Video, Videocomment, Videolike } = require("../model/index");
const { symbolUserKey } = require("../config/config.default");

// 上传视频
module.exports.createVideo = async (req, res, next) => {
  const body = req.body;
  body.user = req[symbolUserKey].userInfo.id;
  const videoModel =  new Video(body);
  try {
    const dbback = await videoModel.save();
    res.status(201).json({ data: dbback })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

// 获取所有视频列表
module.exports.videoList = async (req, res, next) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  const videoList = await Video.find()
    .skip((pageNum - 1) * pageSize) // 分页 跳过多少页
    .limit(pageSize) // 限制展示多少页
    .sort({createAt: -1})
    .populate('user')
  const total = await Video.countDocuments();
  res.status(200).json({ videoList, total })
}

// 获取视频详情
module.exports.video = async (req, res, next) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId)
    .populate('user', 'id, username');

  videoInfo = videoInfo.toJSON();
  videoInfo.islike = false;
  videoInfo.isDislike = false;
  videoInfo.isSubscribe = false;

  if (req.user.userinfo) {
    const userId = req.user.userinfo._id
    if (await Videolike.findOne({ user: userId, video: videoId, like: 1 })) {
      videoInfo.islike = true
    }
    if (await Videolike.findOne({ user: userId, video: videoId, like: -1 })) {
      videoInfo.isDislike = true
    }
    if (await Subscribe.findOne({ user: userId, channel: videoInfo.user._id })) {
      videoInfo.isSubscribe = true
    }
  }

  res.status(200).json(videoInfo);
}

// 添加视频评论
module.exports.comment = async (req, res, next) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if(!video) {
    return res.status(404).josn({ err: "视频不存在" })
  }
  const comment = await new Videocomment({
    content: req.body.content,
    video: videoId,
    user: req[symbolUserKey].userInfo.id
  }).save();
  video.commentCount++;
  await video.save();
  res.status(201).json(comment)
}

// 获取评论列表
module.exports.commentList = async(req, res) => {
  const { pageNum, pageSize } = req.body;
  const videoId = req.params.videoId;
  const comments = await Videocomment.find({
    video: videoId
  })
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize)
  .populate('user', 'id username');
  const total = await Videocomment.countDocuments({ video: videoId })
  res.status(200).json({
    list: comments,
    total
  })
}

// 删除视频评论
module.exports.deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ err: "视频不存在" })
  }
  const comment = await Videocomment.findById(commentId)
  if (!comment) {
    return res.status(404).json({ err: "评论不存在" })
  }
  if(comment.user == req[symbolUserKey].userInfo.id) {
    await comment.remove();
    video.commentCount--;
    video.save();
    res.status(200).json({ msg: "删除成功" })
  } else {
    res.status(403).json({ err: "评论不可删除" })
  }
  
}

// 点击喜欢视频
module.exports.likeViode = async (req, res) => {
  const userId = req[symbolUserKey].userInfo.id;
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ err: "视频不存在" })
  }
  const doc = await Videolike.findOne({
    user: userId,
    video: videoId
  });
  const islike = true;
  if(doc && doc.like === 1) {
    await doc.remove();
    islike = false
  } else if(doc && doc.like === -1) {
    doc.like = 1;
    await doc.save();
  } else {
    await new Videolike({
      like: 1,
      user: userId,
      video: videoId
    }).save();
  }
  video.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1
  })

  video.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1
  })
  await video.save()
  res.status(200).json({
    ...video.toJSON(),
    islike
  })
}

// 点击不喜欢视频
module.exports.dislikeVideo = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userinfo._id
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: "视频不存在" })
  }
  var doc = await Videolike.findOne({
    user: userId,
    video: videoId
  })

  let isdislike = true

  if (doc && doc.like === -1) {
    await doc.remove()
  } else if (doc && doc.like === 1) {
    doc.like = -1
    await doc.save()
    isdislike = false
  } else {
    await new Videolike({
      user: userId,
      video: videoId,
      like: -1
    }).save()
    isdislike = false
  }

  video.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1
  })

  video.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1
  })

  await video.save()
  res.status(200).json({
    ...video.toJSON(),
    isdislike
  })
}

// 获取喜欢的视频
module.exports.likeVideoList = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  const like = await Videolike.find({
    like: 1,
    user: req[symbolUserKey].userInfo.id
  })
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize)
  .populate('video', 'id title vodvideoId user')
  const total = await Videolike.countDocuments({
    like: 1,
    user: req[symbolUserKey].userInfo.id
  })
  res.status(200).josn({ list: like, total })
}