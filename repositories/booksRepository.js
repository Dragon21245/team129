const db = require('../database/db-connector');

exports.getAllBooks = (callback) => {
    const query = 'SELECT * FROM Books';
    db.pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.addBook = (title, author, isbn, branchID, callback) => {
    const query = 'INSERT INTO Books (Title, Author, ISBN, BranchID) VALUES (?, ?, ?, ?)';
    const values = [title, author, isbn, branchID];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.updateBook = (bookID, title, author, isbn, branchID, callback) => {
    const query = 'UPDATE Books SET Title = ?, Author = ?, ISBN = ?, BranchID = ? WHERE BookID = ?';
    const values = [title, author, isbn, branchID, bookID];
    db.pool.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.deleteBook = (bookID, callback) => {
    const query = 'DELETE FROM Books WHERE BookID = ?';
    db.pool.query(query, [bookID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
