const Permission = require("../models/Permission");

exports.checkPermission = (permissions) => {
  //Check the Permission
  return (req, res, next) => {
    const user = req.user;
    const userPermissions = new Permission().getPermissionByRoleName(user.role);
  };
};
