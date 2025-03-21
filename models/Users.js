// Users.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Ensure the user field is required
    unique: true, // Ensure the user field is unique
    trim: true, // Remove any leading/trailing whitespace
    lowercase: true, // Automatically convert user to lowercase
    minlength: [8, "Username must be at least 8 characters long."], // Example validation
    maxlength: [20, "Username must be less than 10 characters long."], // Example validation
  },
  password: {
    type: String,
    required: true, // Ensure password is required
    minlength: [8, "Password must be at least 8 characters long."], // Example validation for password length
  },
  role: { type: String, required: true, trim: true, lowercase: true },
});

// Pre-save hook to hash password and format username
userSchema.pre("save", async function (next) {
  if (this.isModified("username")) {
    this.user = this.user.toLowerCase(); // Automatically lowercase the username
  }

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
  }

  next(); // Continue with the save process
});

// Create and export the model
module.exports = mongoose.model("Expenses", userSchema, "users"); // Use 'User' instead of 'users' for consistency
