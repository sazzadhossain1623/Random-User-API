const express = require("express");
const userController = require("../../controllers/users.controller");
const router = express.Router();

router.route("/:id").patch(userController.updateUser);

module.exports = router;
