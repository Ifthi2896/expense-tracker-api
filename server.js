// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");
require("dotenv").config();
const mongodbConnection = require("./db/mongodbExpense");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

//EJS for View Rendering
app.set("view engine", "ejs");

// Connect to MongoDB
mongodbConnection(process.env.MONGO_URI);
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// Define routes
app.use("/file", uploadRoutes);
app.use("/expenses", expenseRoutes);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API!");
});

// Start the server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
