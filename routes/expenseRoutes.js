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
} = require("../controllers/expenseController");
router.route("/view").get(auth, getExpenses);
router.route("/").get(auth, getExpenses).post(auth, addExpenses);
router
  .route("/:id")
  .get(auth, singleExpenses)
  .put(auth, updateExpenses)
  .delete(auth, deleteExpenses);

module.exports = router;
