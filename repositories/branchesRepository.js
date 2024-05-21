const db = require('../database/db-connector');

function addBranch(branchDescription, callback) {
  const sql = 'INSERT INTO Branches (branchDescription) VALUES (?)';
  db.pool.query(sql, [branchDescription], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function updateBranch(branchID, newDescription, callback) {
  const sql = 'UPDATE Branches SET branchDescription = ? WHERE branchID = ?';
  db.pool.query(sql, [newDescription, branchID], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function deleteBranch(branchID, callback) {
  const sql = 'DELETE FROM Branches WHERE branchID = ?';
  db.pool.query(sql, [branchID], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function getAllBranches(callback) {
  const sql = 'SELECT * FROM Branches';
  db.pool.query(sql, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = {
  addBranch,
  updateBranch,
  deleteBranch,
  getAllBranches
};
