const db = require('../database/db-connector');

exports.getAllPatrons = (callback) => {
    const query = 'SELECT * FROM Patrons';
    db.pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.addPatron = (email, dues, phoneNumber, callback) => {
    const query = 'INSERT INTO Patrons (Email, Dues, PhoneNumber) VALUES (?, ?, ?)';
    const values = [email, dues, phoneNumber];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.updatePatron = (patronID, email, dues, phoneNumber, callback) => {
    const query = 'UPDATE Patrons SET Email = ?, Dues = ?, PhoneNumber = ? WHERE PatronID = ?';
    const values = [email, dues, phoneNumber, patronID];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.deletePatron = (patronID, callback) => {
    const query = 'DELETE FROM Patrons WHERE PatronID = ?';
    db.pool.query(query, [patronID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
