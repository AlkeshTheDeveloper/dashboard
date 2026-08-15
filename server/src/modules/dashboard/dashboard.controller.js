const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const HTTP_STATUS = require("../../constants/httpStatus");
const DashboardService = require("./dashboard.service");

const getSummary = asyncHandler(async (req, res) => {
  const summary = await DashboardService.getSummary(req.user.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        summary,
        "Dashboard summary fetched successfully",
      ),
    );
});

const getCategoryBreakdown = asyncHandler(async (req, res) => {
  const data = await DashboardService.getCategoryBreakdown(req.user.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        data,
        "Category breakdown fetched successfully",
      ),
    );
});

const getMonthlyTrend = asyncHandler(async (req, res) => {
  const data = await DashboardService.getMonthlyTrend({
    userId: req.user.id,
    year: req.query.year,
  });

  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        data,
        "Monthly trend fetched successfully",
      ),
    );
});

const getRecentExpenses = asyncHandler(async (req, res) => {
  const data = await DashboardService.getRecentExpenses(req.user.id);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        data,
        "Recent expenses fetched successfully",
      ),
    );
});

const getDashboard = asyncHandler(async (req, res) => {
  const year = req.query.year;

  const [summary, categoryBreakdown, monthlyTrend, recentExpenses] =
    await Promise.all([
      DashboardService.getSummary(req.user.id),
      DashboardService.getCategoryBreakdown(req.user.id),
      DashboardService.getMonthlyTrend({
        userId: req.user.id,
        year,
      }),
      DashboardService.getRecentExpenses(req.user.id),
    ]);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {
        summary,
        categoryBreakdown,
        monthlyTrend,
        recentExpenses,
      },
      "Dashboard fetched successfully",
    ),
  );
});

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
  getRecentExpenses,
  getDashboard,
};
