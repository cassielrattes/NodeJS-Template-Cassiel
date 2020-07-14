const connection = require('./connectionFactory');

class dbUtils {
  static create(obj, tb, cb) {
    connection.query(`INSERT INTO ${tb} SET ?`, obj, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  }

  static read(tb, cb) {
    connection.query(`SELECT * FROM ${tb}`, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  }

  static readPerId(tb, pk, cb) {
    connection.query(
      `SELECT * FROM ${tb} where ${pk.key}=?`,
      pk.value,
      (err, res) => {
        if (err) throw err;
        cb(res);
      },
    );
  }

  static update(obj, tb, pk, cb) {
    connection.query(
      `UPDATE ${tb} SET ? WHERE ${pk.key}=?`,
      [obj, pk.value],
      (err, res) => {
        if (err) throw err;
        cb(res);
      },
    );
  }

  static delete(tb, pk, cb) {
    connection.query(
      `DELETE FROM ${tb} WHERE ${pk.key}=?`,
      pk.value,
      (err, res) => {
        if (err) throw err;
        cb(res);
      },
    );
  }
}

module.exports = dbUtils;
