const db = require('../database/db-connector');

function addPatron(email, dues, phoneNumber, callback) {
  const sql = 'INSERT INTO Patrons (Email, Dues, PhoneNumber) VALUES (?, ?, ?)';
  db.pool.query(sql, [email, dues, phoneNumber], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function updatePatron(patronID, email, dues, phoneNumber, callback) {
  const sql = 'UPDATE Patrons SET Email = ?, Dues = ?, PhoneNumber = ? WHERE PatronID = ?';
  db.pool.query(sql, [email, dues, phoneNumber, patronID], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function deletePatron(patronID, callback) {
  const sql = 'DELETE FROM Patrons WHERE PatronID = ?';
  db.pool.query(sql, [patronID], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function getAllPatrons(callback) {
  const sql = 'SELECT * FROM Patrons';
  db.pool.query(sql, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = {
  addPatron,
  updatePatron,
  deletePatron,
  getAllPatrons
};
