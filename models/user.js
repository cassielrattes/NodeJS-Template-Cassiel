const Utils = require('../helpers/utils');

class User {
  static get table() {
    return 'users';
  }

  constructor(ObjUser) {
    this.username = '';
    this.password = '';
    Object.assign(this, ObjUser);
  }

  encryptPassword(password) {
    this.password = Utils.encrypt(password);
  }
}

module.exports = User;
