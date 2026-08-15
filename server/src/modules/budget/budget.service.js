const mongoose = require("mongoose");

const Budget = require("./budget.model");
const Expense = require("../expense/expense.model");

const getBudget = async (userId, month, year) => {
  const budget = await Budget.findOne({
    user: userId,
    month,
    year,
  });

  if (!budget) {
    return null;
  }

  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 1);

  const result = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        expenseDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        spent: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const spent = result[0]?.spent || 0;

  const remaining = budget.budgetAmount - spent;

  return {
    _id: budget._id,
    salary: budget.salary,
    budgetAmount: budget.budgetAmount,
    spent,
    remaining,
    month: budget.month,
    year: budget.year,
  };
};

const createOrUpdateBudget = async (userId, data) => {
  const { salary, budgetAmount, month, year } = data;

  const budget = await Budget.findOneAndUpdate(
    {
      user: userId,
      month,
      year,
    },
    {
      user: userId,
      salary,
      budgetAmount,
      month,
      year,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );

  return budget;
};

module.exports = {
  getBudget,
  createOrUpdateBudget,
};
