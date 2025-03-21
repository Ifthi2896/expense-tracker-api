const roles = require("../helpers/roles.json");

class Roles {
  constructor() {
    this.roles = roles;
  }
  getRolesByName(name) {
    return this.roles.find((role) => role.name === name);
  }
  getRoles() {
    return this.roles;
  }
}

module.exports = Roles;
