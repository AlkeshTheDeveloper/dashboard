const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const DashboardController = require("./dashboard.controller");

router.get("/summary", authMiddleware, DashboardController.getSummary);

router.get(
  "/category-breakdown",
  authMiddleware,
  DashboardController.getCategoryBreakdown,
);

router.get(
  "/monthly-trend",
  authMiddleware,
  DashboardController.getMonthlyTrend,
);

router.get(
  "/recent-expenses",
  authMiddleware,
  DashboardController.getRecentExpenses,
);

router.get("/", authMiddleware, DashboardController.getDashboard);

module.exports = router;
