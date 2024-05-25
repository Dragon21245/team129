const db = require('../database/db-connector');

exports.getAllLoans = (callback) => {
    const query = 'SELECT * FROM LoanHeader';
    db.pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.addLoan = (patronID, branchID, beginDate, expectedReturn, overDueFee, callback) => {
    const query = 'INSERT INTO LoanHeader (PatronID, BranchID, BeginDate, ExpectedReturn, OverDueFee) VALUES (?, ?, ?, ?, ?)';
    const values = [patronID, branchID, beginDate, expectedReturn, overDueFee];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.updateLoan = (loanID, patronID, branchID, beginDate, expectedReturn, overDueFee, callback) => {
    const query = 'UPDATE LoanHeader SET PatronID = ?, BranchID = ?, BeginDate = ?, ExpectedReturn = ?, OverDueFee = ? WHERE LoanID = ?';
    const values = [patronID, branchID, beginDate, expectedReturn, overDueFee, loanID];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.deleteLoan = (loanID, callback) => {
    const query = 'DELETE FROM LoanHeader WHERE LoanID = ?';
    db.pool.query(query, [loanID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.getLoanByPhoneNumber = (phoneNumber, callback) => {
    const query = `SELECT * FROM LoanHeader WHERE PatronID IN (SELECT PatronID FROM Patrons WHERE PhoneNumber = ?)`;
    db.pool.query(query, [phoneNumber], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
