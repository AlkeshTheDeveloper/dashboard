const { body, param } = require("express-validator");

const { EXPENSE_CATEGORIES, PAYMENT_METHODS } = require("./expense.constants");

const titleValidation = body("title")
  .trim()
  .notEmpty()
  .withMessage("Title is required")
  .isLength({ min: 3, max: 100 })
  .withMessage("Title must be between 3 and 100 characters");

const amountValidation = body("amount")
  .isFloat({ gt: 0 })
  .withMessage("Amount must be greater than 0");

const createExpenseValidation = [
  titleValidation,
  amountValidation,

  body("category").isIn(EXPENSE_CATEGORIES).withMessage("Invalid category"),

  body("paymentMethod")
    .isIn(PAYMENT_METHODS)
    .withMessage("Invalid payment method"),

  body("expenseDate").isISO8601().withMessage("Invalid expense date"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

const updateExpenseValidation = [
  param("expenseId").isMongoId().withMessage("Invalid expense id"),
  titleValidation,
  amountValidation,
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(EXPENSE_CATEGORIES)
    .withMessage("Invalid category"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(PAYMENT_METHODS)
    .withMessage("Invalid payment method"),

  body("expenseDate")
    .notEmpty()
    .withMessage("Expense date is required")
    .isISO8601()
    .withMessage("Invalid expense date"),

  body("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

module.exports = {
  createExpenseValidation,
  updateExpenseValidation,
};
