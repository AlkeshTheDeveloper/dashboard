const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const expenseRoutes = require("../modules/expense/expense.routes");
const dashboardRoutes = require("../modules/dashboard/dashboard.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/expenses", expenseRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
