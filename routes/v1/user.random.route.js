const express = require("express");
const userController = require("../../controllers/users.controller");
const router = express.Router();

router.route("/").get(userController.getRandomUser);
module.exports = router;
