const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const BudgetController = require("./budget.controller");

router.get("/", authMiddleware, BudgetController.getBudget);

router.post("/", authMiddleware, BudgetController.saveBudget);

module.exports = router;
