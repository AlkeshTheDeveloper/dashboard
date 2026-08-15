const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const UserController = require("./user.controller");

router.put("/profile", authMiddleware, UserController.updateProfile);

module.exports = router;
