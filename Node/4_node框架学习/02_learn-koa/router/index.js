const Router = require("@koa/router");
const userController = require("../controller/userController");
const videoController = require("../controller/videoController");
const { registerValidate, loginValidate } = require("../middleware/userValidate");
const { verifyToken } = require("../util/jwt");
const router = new Router({ prefix: '/api/v1' }); // prefix 设置路由前缀

// 用户频道模块
router.post('/user/register', registerValidate, userController.register);
router.post('/user/login', loginValidate, userController.login);
router.get('/user/getUser/:userid', verifyToken(false), userController.getUser);
router.post('/user/subscribe/:subscribeid', verifyToken(true), userController.subscribe);
router.get('/user/subscribelist', verifyToken(true), userController.subscribeList);

// 视频模块管理
// router.get('/video/getvod', verifyToken(true), vodController.getvod)
router.post('/video/createVideo', verifyToken(true), videoController.createVideo);
router.post('/video/videolist/:userid', videoController.videoList);
router.get('/video/getvideo/:videoid', videoController.getVideo);

// 交互模块
router.post('/video/comment/:videoid', verifyToken(true), videoController.createComment);

module.exports = router;