const connection = require('../helpers/connectionFactory');

class UserDAO {
  verifyUser(user, cb) {
    connection.query(
      'SELECT * FROM users WHERE username=? and password=?',
      [user.username, user.password],
      (err, res) => {
        if (err) throw err;
        else cb(res);
      },
    );
  }
}

module.exports = UserDAO;
