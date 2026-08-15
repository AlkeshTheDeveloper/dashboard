const express = require("express");

const ExpenseController = require("./expense.controller");
const {
  createExpenseValidation,
  updateExpenseValidation,
} = require("./expense.validation");

const validate = require("../../middleware/validation.middleware");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createExpenseValidation,
  validate,
  ExpenseController.createExpense,
);

router.get("/", authMiddleware, ExpenseController.getExpenses);
router.put(
  "/:expenseId",
  authMiddleware,
  updateExpenseValidation,
  validate,
  ExpenseController.updateExpense,
);

module.exports = router;
