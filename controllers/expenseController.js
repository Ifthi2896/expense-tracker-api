// controllers/expenseController.js
const mongoose = require("mongoose");
const Expense = require("../models/Expense");
const { createObjectCsvWriter } = require("csv-writer");
const path = require("path");
const fs = require("fs");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    // Render the 'expenses' template and pass the expenses data to the view
    console.log(expenses);
    res.render("expenses", { expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addExpenses = async (req, res) => {
  try {
    const expenses = new Expense(req.body);
    console.log(expenses);
    await expenses.save();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.singleExpenses = async (req, res) => {
  const { id } = req.params; // Access ID from the request parameters
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Expense ID" });
  }

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpenses = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Expense Id" });
  }
  try {
    const updateExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateExpense) {
      return res.status(404).json({ error: "Expense not Found" });
    }
    res.json(updateExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteExpenses = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Expense ID" });
  }
  try {
    const deleteExpense = await Expense.findByIdAndDelete(id);
    if (!deleteExpense) {
      return res.status(404).json({ error: "Expense Not Found" });
    }
    res.json({ message: "Expense Delete Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (category) {
      query.category = category;
    }
    const filteredExpenses = await Expense.find(query);

    res.json(filteredExpenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
