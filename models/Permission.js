const Roles = require("./Roles");

class Permission {
  constructor() {
    this.permission = [];
  }
  getPermissionByRoleName(roleName) {
    const role = new Roles().getRoles().roles.find((r) => r.name === roleName);
    return role ? role.permissions: []
  }
}

module.exports = Permission;