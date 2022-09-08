const express = require("express");
const userController = require("../../controllers/users.controller");
const router = express.Router();

const limiter = require("../../middleware/limiter");

router.route("/").get(limiter, userController.getAllUser);
// router.route("/").get(userController.getRandomUser);
// router.route("/").post();

// router.route("/:id").patch().delete();

// router.route("/").patch();

// router.route("/").delete();

module.exports = router;
