const Expense = require("./expense.model");

const createExpense = async (expenseData) => {
  return Expense.create(expenseData);
};

const getExpenses = async ({
  page = 1,
  limit = 10,
  search,
  category,
  paymentMethod,
  sortBy = "expenseDate",
  order = "desc",
  userId,
}) => {
  const query = {
    user: userId,
  };
  if (category) {
    query.category = category;
  }
  if (paymentMethod) {
    query.paymentMethod = paymentMethod;
  }
  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }
  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };
  const pageNumber = Math.max(1, Number(page) || 1);

  const limitNumber = Math.min(100, Math.max(1, Number(limit) || 10));
  const skip = (pageNumber - 1) * limitNumber;


  const expenses = await Expense.find(query)
    .select("-__v")
    .sort(sort)
    .skip(skip)
    .limit(limitNumber);

  const totalRecords = await Expense.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limitNumber);

  const pagination = {
    page: pageNumber,
    limit: limitNumber,
    totalRecords,
    totalPages,
    hasNextPage: pageNumber < totalPages,
    hasPreviousPage: pageNumber > 1,
  };
  return {
    expenses,
    pagination,
  };
};

const updateExpense = async ({ expenseId, userId, expenseData }) => {
  const expense = await Expense.findOneAndUpdate(
    {
      _id: expenseId,
      user: userId,
    },
    expenseData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!expense) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Expense not found");
  }
  return expense;
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
};
