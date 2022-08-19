const express = require("express");
const multer = require("multer");
const userController = require("../controller/userController");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } =require("../util/jwt");

const router = express.Router();
const upload = multer({dest: 'public/'})

router.post('/registers', validator.register, userController.register)
.post('/logins', validator.login, userController.login)
.post('/lists', verifyToken(), userController.lists)
.post('/update', verifyToken(), validator.update, userController.update)
.post('/uploadAvatar', verifyToken(), upload.single('avatar'), userController.uploadAvatar)
.get('/subscribe/:userId', verifyToken(), userController.subscribe)
.get('/unsubscribe/:userId', verifyToken(), userController.unsubscribe)
.get('/getUser/:userId', verifyToken(false), userController.getUser)
.get('/getSubscribe/:userId', userController.getSubscribe)
.get('/getChannel', verifyToken(), userController.getChannel)

module.exports = router;