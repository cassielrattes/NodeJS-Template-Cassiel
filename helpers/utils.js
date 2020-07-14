const crypto = require('crypto');

class Utils {
  static encrypt(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}

module.exports = Utils;
