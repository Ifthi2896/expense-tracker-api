// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for authorization
const { checkPermission } = require('../middleware/rbac'); // Middleware for RBAC
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// CRUD routes for users
router.route('/')
  .get(auth, checkPermission(['read_user']), getUsers) // Only users with permission can get all users
  .post(auth, checkPermission(['create_user']), createUser); // Only users with permission can create a new user

router.route('/:id')
  .get(auth, checkPermission(['read_user']), getUserById) // Only admin can get a specific user
  .put(auth, checkPermission(['update_user']), updateUser) // Only admin can update a user
  .delete(auth, checkPermission(['delete_user']), deleteUser); // Only admin can delete a user

module.exports = router;
