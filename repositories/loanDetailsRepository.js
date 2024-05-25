const db = require('../database/db-connector');

exports.getAllLoanDetails = (callback) => {
    const query = 'SELECT * FROM LoanDetails';
    db.pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.addLoanDetail = (loanID, bookID, individualFee, callback) => {
    const query = 'INSERT INTO LoanDetails (LoanID, BookID, IndividualFee) VALUES (?, ?, ?)';
    const values = [loanID, bookID, individualFee];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.updateLoanDetail = (detailID, loanID, bookID, individualFee, callback) => {
    const query = 'UPDATE LoanDetails SET LoanID = ?, BookID = ?, IndividualFee = ? WHERE DetailID = ?';
    const values = [loanID, bookID, individualFee, detailID];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.deleteLoanDetail = (detailID, callback) => {
    const query = 'DELETE FROM LoanDetails WHERE DetailID = ?';
    db.pool.query(query, [detailID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
