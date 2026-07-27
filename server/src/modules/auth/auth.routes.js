const express = require("express");

const router = express.Router();

const { register, login,getMe } = require("./auth.controller");

const { registerValidation, loginValidation } = require("./auth.validation");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);
router.get("/me", authMiddleware, getMe);
module.exports = router;
