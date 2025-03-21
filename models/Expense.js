// models/Expense.js
const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Expense name is required"] },
  amount: { type: Number, required: [true, "Amount is required"], min: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expenses", ExpenseSchema, "transaction");
