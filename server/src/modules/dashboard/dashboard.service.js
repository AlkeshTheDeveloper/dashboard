const mongoose = require("mongoose");
const Expense = require("../expense/expense.model");

const getSummary = async (userId) => {
  const summary = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$category",
        totalExpense: {
          $sum: "$amount",
        },

        expenseCount: {
          $sum: 1,
        },

        averageExpense: {
          $avg: "$amount",
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalExpense: 1,
        expenseCount: 1,
        averageExpense: 1,
      },
    },
  ]);
  return summary[0];
};

const getCategoryBreakdown = async (userId) => {
  const breakdown = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$category",
        totalExpense: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalExpense: 1,
      },
    },
    {
      $sort: {
        totalExpense: -1,
      },
    },
  ]);

  return breakdown;
};

const getMonthlyTrend = async ({ userId, year }) => {
  const selectedYear = Number(year) || new Date().getFullYear();
  const startDate = new Date(selectedYear, 0, 1);

  const endDate = new Date(selectedYear + 1, 0, 1);
  const trend = await Expense.aggregate([
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
        _id: {
          month: {
            $month: "$expenseDate",
          },
        },
        totalExpense: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalExpense: 1,
      },
    },
  ]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const trendMap = new Map();

  trend.forEach((item) => {
    trendMap.set(item.month, item.totalExpense);
  });

  const monthlyTrend = months.map((month, index) => ({
    month,
    totalExpense: trendMap.get(index + 1) || 0,
  }));

  return monthlyTrend;
};

const getRecentExpenses = async (userId) => {
  return await Expense.find({
    user: userId,
  })
    .sort({
      expenseDate: -1,
    })
    .limit(5)
    .lean();
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
  getRecentExpenses
};
