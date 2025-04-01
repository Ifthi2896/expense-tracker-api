// middleware/rbac.js
const Permission = require("../models/Permission");

exports.checkPermission = (permissions) => {
  return (req, res, next) => {
    const user = req.user;
    const userPermissions = new Permission().getPermissionByRoleName(user.role);

    // Check if user has one of the required permissions
    const hasPermission = permissions.some(permission => userPermissions.includes(permission));
    if (!hasPermission) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  };
};
