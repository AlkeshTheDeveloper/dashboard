const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");
const budgetRoutes = require("./modules/budget/budget.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", routes);

app.use("/api/budget", budgetRoutes);

// Global Error Handler (always last)
app.use(errorHandler);

module.exports = app;