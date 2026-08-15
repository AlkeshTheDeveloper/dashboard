const mongoose = require("mongoose");

const { EXPENSE_CATEGORIES, PAYMENT_METHODS } = require("./expense.constants");


const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      minlength: 3,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    category: {
      type: String,
      enum: EXPENSE_CATEGORIES,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true,
    },

    expenseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

expenseSchema.index({
  user: 1,
  expenseDate: -1,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;