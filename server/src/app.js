const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");
const budgetRoutes = require("./modules/budget/budget.routes");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", routes);

app.use("/api/budget", budgetRoutes);

// Global Error Handler (always last)
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API is running",
  });
});

module.exports = app;