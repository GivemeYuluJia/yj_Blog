const express = require("express");
const multer = require("multer");
const userConrtoller = require("../controller/user");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } =require("../util/jwt");

const router = express.Router();
const upload = multer({dest: 'public/'})

router.post('/registers', validator.register, userConrtoller.register)
.post('/logins', validator.login, userConrtoller.login)
.post('/lists', verifyToken, userConrtoller.lists)
.post('/update', verifyToken, validator.update, userConrtoller.update)
.post('/uploadAvatar', verifyToken, upload.single('avatar'), userConrtoller.uploadAvatar)

module.exports = router;