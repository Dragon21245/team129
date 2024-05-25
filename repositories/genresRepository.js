const db = require('../database/db-connector');

exports.getAllGenres = (callback) => {
    const query = 'SELECT * FROM Genres';
    db.pool.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.addGenre = (genreName, callback) => {
    const query = 'INSERT INTO Genres (GenreName) VALUES (?)';
    db.pool.query(query, [genreName], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.updateGenre = (genreID, genreName, callback) => {
    const query = 'UPDATE Genres SET GenreName = ? WHERE GenreID = ?';
    db.pool.query(query, [genreName, genreID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

exports.deleteGenre = (genreID, callback) => {
    const query = 'DELETE FROM Genres WHERE GenreID = ?';
    db.pool.query(query, [genreID], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
