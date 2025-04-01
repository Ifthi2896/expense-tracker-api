// controllers/userController.js
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const { createObjectCsvWriter } = require("csv-writer");
const path = require("path");
const fs = require("fs");

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const newUser = new User({ username, password, email, role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (Admin can fetch all, others only their own info)
exports.getUsers = async (req, res) => {
  try {
    const users = req.user.role === 'admin' || req.user.role === 'superadmin'
      ? await User.find() // Admins and superadmins can see all users
      : await User.find({ _id: req.user._id }); // Regular users can only see themselves

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID (Only admin or superadmin can do this)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Admin or Superadmin can view any user
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      return res.json(user);
    }

    // Regular users can only see their own profile
    if (req.user._id.toString() === user._id.toString()) {
      return res.json(user);
    }

    return res.status(403).json({ message: 'Permission denied' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user (Only admin or superadmin)
exports.updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user (Only admin or superadmin)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.exportUsersToCSV = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const exportDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const filepath = path.join(exportDir, "users-report.csv");

    const csvWriter = createObjectCsvWriter({
      path: filepath,
      header: [
        { id: "_id", title: "ID" },
        { id: "username", title: "Username" },
        { id: "email", title: "Email" },
        { id: "role", title: "Role" },
      ],
    });

    await csvWriter.writeRecords(users);

    res.download(filepath, "users-report.csv", (err) => {
      if (err) {
        console.error("Error sending the file: ", err);
      }
    });

    fs.unlink(filepath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting the file : ", unlinkErr);
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};