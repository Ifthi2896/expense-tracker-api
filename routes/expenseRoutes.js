// routes/expenseRoutes.js
const express = require("express");
const auth = require('../middleware/auth')
const router = express.Router();
const {
  addExpenses,
  getExpenses,
  singleExpenses,
  updateExpenses,
  deleteExpenses,
  filterExpenses,
} = require("../controllers/expenseController");
router.route("/view").get(auth, getExpenses);
router.route("/").get(auth, getExpenses).post(auth, addExpenses);
router
  .route("/:id")
  .get(auth, singleExpenses)
  .put(auth, updateExpenses)
  .delete(auth, deleteExpenses);
router.route("/filter").get(auth, filterExpenses);

module.exports = router;
