const express = require("express");
const router = express.Router();
const userConrtoller = require("../controller/user");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } =require("../util/jwt");

router.post('/registers', validator.register, userConrtoller.register)
.post('/logins', validator.login, userConrtoller.login)
.post('/lists', verifyToken, userConrtoller.lists)

module.exports = router;