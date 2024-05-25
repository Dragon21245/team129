const db = require('../database/db-connector');

exports.getAllBranches = (callback) => {
    const query = 'SELECT * FROM Branches';
    db.pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.addBranch = (branchDescription, callback) => {
    const query = 'INSERT INTO Branches (BranchDescription) VALUES (?)';
    db.pool.query(query, [branchDescription], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.updateBranch = (branchID, branchDescription, callback) => {
    const query = 'UPDATE Branches SET BranchDescription = ? WHERE BranchID = ?';
    db.pool.query(query, [branchDescription, branchID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.deleteBranch = (branchID, callback) => {
    const query = 'DELETE FROM Branches WHERE BranchID = ?';
    db.pool.query(query, [branchID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
