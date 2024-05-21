const db = require('../database/db-connector');

function insertBook(newBookData, callback) {
  const sql = 'INSERT INTO Books SET ?';
  db.pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
      return;
    }
    connection.query(sql, newBookData, (err, result) => {
      connection.release();
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  });
}

module.exports = {
  insertBook
};
