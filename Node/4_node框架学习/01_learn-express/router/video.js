const express = require('express');

const { verifyToken } = require('../util/jwt');
const { videoValidator } = require("../middleware/validator/videoValidator")
const videoController = require("../controller/videoController");

const router = express.Router();

router.post('/createVideo', verifyToken(), videoValidator, videoController.createVideo)
.post('/videoList', videoController.videoList)
.get('/video/:videoId', verifyToken(false), videoController.video)
.post('/comment/:videoId', verifyToken(), videoController.comment)
.post('/commentList/:videoId', videoController.commentList)
.post('/deleteComment/:videoId/:commentId', verifyToken(), videoController.deleteComment)
.get('/likeVideo/:videoId', verifyToken(), videoController.likeViode)
.get('/dislikeVideo/:videoId', verifyToken(), videoController.dislikeVideo)
.post('/likeVideoList/:videoId', verifyToken(), videoController.likeVideoList)
.get('/collect/:videoId', verifyToken(), videoController.collect)
module.exports = router;