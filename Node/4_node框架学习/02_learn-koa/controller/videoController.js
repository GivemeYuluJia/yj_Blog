const { Video, Videocomment, Videolike } = require("../model/index");
const { symbolUserKey } = require("../config/config.default");

module.exports.createComment = async ctx => {
  const videoId = ctx.request.params.videoid;
  const { content } = ctx.request.body;
  const userId = ctx[symbolUserKey].userInfo.id;
  
  const videoInfo = await Video.findById(videoId)
  if(videoInfo) {
    const dbback = await new Videocomment({
      content,
      user: userId,
      video: videoId
    }).save();
    if (dbback) {
      videoInfo.commentCount++
      await videoInfo.save()
      ctx.body = { msg: "评论成功" }
    } else {
      ctx.throw(501, '评论失败')
    }
  } else {
    ctx.throw(404, '视频不存在')
  }

}

module.exports.getVideo = async ctx => {
  const videoId = ctx.request.params.videoid;
  const dbback = await Video.findById(videoId)
    .populate("user", [
      "id",
      "username",
      "subscribeCount"
    ]);
  ctx.body = dbback;
  const videoinfo = dbback._doc
  if (videoinfo) {
    const { gtevodplay } = require('./vodController')
    var vodinfo = await gtevodplay(videoinfo.vodvideoId)
    videoinfo.vod = vodinfo
    ctx.body = videoinfo
  } else {
    ctx.throw(501, '视频不存在')
  }
}

module.exports.videoList = async ctx => {
  const userId = ctx.request.params.userid;
  const { pageNum, pageSize } = ctx.request.body;
  const dblist = await Video.find({ user: userId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({createAt: -1})
    .populate('user', [
      "username",
      "id",
      "subscribeCount"
    ])
  ctx.body = dblist;
}

module.exports.createVideo = async ctx => {
  const body = ctx.request.body;
  const userId = ctx[symbolUserKey].userInfo.id;
  try {
    const dbback = await new Video({
      ...body,
      user: userId
    }).save();
    ctx.body = dbback;
  } catch (error) {
    ctx.throw(502, error)
  }
}