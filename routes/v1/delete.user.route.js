const express = require("express");
const userController = require("../../controllers/users.controller");
const router = express.Router();

router.route("/:id").delete(userController.DeleteUser);

module.exports = router;
