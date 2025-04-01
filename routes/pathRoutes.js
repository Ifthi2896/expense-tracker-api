//routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup validation helper
const validatorSignup = (user, password, role) => {
  if (!user || !password || !role) {
    return "Username and password are required.";
  }
  if (password.length < 8) {
    // Use password.length for correct length comparison
    return "Password must be at least 8 characters long.";
  }
  return null;
};

router.route("/signup").post(async (req, res) => {
  // Fixed the route to "/signup"
  const { username, password, role } = req.body;
  const validatorError = validatorSignup(username, password, role);
  if (validatorError) {
    return res.status(400).json({ error: validatorError });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    // Respond with a success message
    return res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
});

router.route("/login").post(async (req, res) => {
  const username = req.body.user;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json({ error: "user not found" });
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid Password" });
  jwt.sing();
  const token = jwt.sign({ user: user.user, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
