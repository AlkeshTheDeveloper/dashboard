const ExpenseService = require("./expense.service");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const HTTP_STATUS = require("../../constants/httpStatus");

const createExpense = asyncHandler(async (req, res) => {
  const expense = await ExpenseService.createExpense({
    ...req.body,
    user: req.user.id,
  });

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      expense,
      "Expense created successfully"
    )
  );
});


const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await ExpenseService.getExpenses({
    ...req.query,
    userId: req.user.id,
  });

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      expenses,
      "Expenses fetched successfully"
    )
  );
});

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await ExpenseService.updateExpense({
    expenseId: req.params.expenseId,
    userId: req.user.id,
    expenseData: req.body,
  });

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      expense,
      "Expense updated successfully"
    )
  );
});

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
};