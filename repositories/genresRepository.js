const db = require('../database/db-connector');

function addGenre(genreName, callback) {
  const sql = 'INSERT INTO Genres (GenreName) VALUES (?)';
  db.pool.query(sql, [genreName], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function updateGenre(genreID, newGenreName, callback) {
  const sql = 'UPDATE Genres SET GenreName = ? WHERE GenreID = ?';
  db.pool.query(sql, [newGenreName, genreID], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function deleteGenre(genreID, callback) {
  const sql = 'DELETE FROM Genres WHERE GenreID = ?';
  db.pool.query(sql, [genreID], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

function getAllGenres(callback) {
  const sql = 'SELECT * FROM Genres';
  db.pool.query(sql, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}

module.exports = {
  addGenre,
  updateGenre,
  deleteGenre,
  getAllGenres
};
