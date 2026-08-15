const BudgetService = require("./budget.service");

const getBudget = async (req, res) => {
  const month = Number(req.query.month) || new Date().getMonth() + 1;

  const year = Number(req.query.year) || new Date().getFullYear();

  const budget = await BudgetService.getBudget(req.user.id, month, year);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    data: budget,
    message: "Budget fetched successfully",
  });
};

const saveBudget = async (req, res) => {
  const budget = await BudgetService.createOrUpdateBudget(
    req.user.id,
    req.body,
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    data: budget,
    message: "Budget saved successfully",
  });
};

module.exports = {
  getBudget,
  saveBudget,
};
