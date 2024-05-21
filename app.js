const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const branchesRepo = require('./repositories/branchesRepository');
const genresRepo = require('./repositories/genresRepository');
const patronsRepo = require('./repositories/patronsRepository');
const booksRepo = require('./repositories/booksRepository');
const loanHeaderRepo = require('./repositories/loanHeaderRepository');
const loanDetailsRepo = require('./repositories/loanDetailsRepository');

const app = express();

const PORT = 11111; // Setting a port number
const HOSTNAME = 'classwork.engr.oregonstate.edu'; // Setting the hostname

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

/*
    ROUTES
*/

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search-loans', function(req, res) {
    const phoneNumber = req.query.phoneNumber;
    const query = `SELECT * FROM LoanHeader WHERE PatronID IN (SELECT PatronID FROM Patrons WHERE PhoneNumber = ?)`;
    db.pool.query(query, [phoneNumber], (error, results) => {
        if (error) {
            console.error('Error searching loans:', error);
            res.status(500).send('Error searching loans. Please try again later.');
            return;
        }
        res.json(results);
    });
});

// Branches routes
app.get('/branches', (req, res) => {
    branchesRepo.getAllBranches((err, branches) => {
        if (err) {
            res.status(500).send('Error getting branches');
        } else {
            res.render('branches', { branches });
        }
    });
});

app.post('/branches', (req, res) => {
    const { branchDescription } = req.body;
    branchesRepo.addBranch(branchDescription, (err, result) => {
        if (err) {
            res.status(500).send('Error adding branch');
        } else {
            res.redirect('/branches');
        }
    });
});

app.put('/branches/:id', (req, res) => {
    const branchID = req.params.id;
    const { branchDescription } = req.body;
    branchesRepo.updateBranch(branchID, branchDescription, (err, result) => {
        if (err) {
            res.status(500).send('Error updating branch');
        } else {
            res.status(200).send('Branch updated successfully');
        }
    });
});

app.delete('/branches/:id', (req, res) => {
    const branchID = req.params.id;
    branchesRepo.deleteBranch(branchID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting branch');
        } else {
            res.status(200).send('Branch deleted successfully');
        }
    });
});

// Genres routes
app.get('/genres', (req, res) => {
    genresRepo.getAllGenres((err, genres) => {
        if (err) {
            res.status(500).send('Error getting genres');
        } else {
            res.render('genres', { genres });
        }
    });
});

app.post('/genres', (req, res) => {
    const { genreName } = req.body;
    genresRepo.addGenre(genreName, (err, result) => {
        if (err) {
            res.status(500).send('Error adding genre');
        } else {
            res.redirect('/genres');
        }
    });
});

app.put('/genres/:id', (req, res) => {
    const genreID = req.params.id;
    const { genreName } = req.body;
    genresRepo.updateGenre(genreID, genreName, (err, result) => {
        if (err) {
            res.status(500).send('Error updating genre');
        } else {
            res.status(200).send('Genre updated successfully');
        }
    });
});

app.delete('/genres/:id', (req, res) => {
    const genreID = req.params.id;
    genresRepo.deleteGenre(genreID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting genre');
        } else {
            res.status(200).send('Genre deleted successfully');
        }
    });
});

// Patrons routes
app.get('/patrons', (req, res) => {
    patronsRepo.getAllPatrons((err, patrons) => {
        if (err) {
            res.status(500).send('Error getting patrons');
        } else {
            res.render('patrons', { patrons });
        }
    });
});

app.post('/patrons', (req, res) => {
    const { email, dues, phoneNumber } = req.body;
    patronsRepo.addPatron(email, dues, phoneNumber, (err, result) => {
        if (err) {
            res.status(500).send('Error adding patron');
        } else {
            res.redirect('/patrons');
        }
    });
});

app.put('/patrons/:id', (req, res) => {
    const patronID = req.params.id;
    const { email, dues, phoneNumber } = req.body;
    patronsRepo.updatePatron(patronID, email, dues, phoneNumber, (err, result) => {
        if (err) {
            res.status(500).send('Error updating patron');
        } else {
            res.status(200).send('Patron updated successfully');
        }
    });
});

app.delete('/patrons/:id', (req, res) => {
    const patronID = req.params.id;
    patronsRepo.deletePatron(patronID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting patron');
        } else {
            res.status(200).send('Patron deleted successfully');
        }
    });
});

// Books routes
app.get('/books', (req, res) => {
    booksRepo.getAllBooks((err, books) => {
        if (err) {
            res.status(500).send('Error getting books');
        } else {
            res.render('books', { books });
        }
    });
});

app.post('/books', (req, res) => {
    const { title, author, isbn, branchID } = req.body;
    booksRepo.addBook(title, author, isbn, branchID, (err, result) => {
        if (err) {
            res.status(500).send('Error adding book');
        } else {
            res.redirect('/books');
        }
    });
});

app.put('/books/:id', (req, res) => {
    const bookID = req.params.id;
    const { title, author, isbn, branchID } = req.body;
    booksRepo.updateBook(bookID, title, author, isbn, branchID, (err, result) => {
        if (err) {
            res.status(500).send('Error updating book');
        } else {
            res.status(200).send('Book updated successfully');
        }
    });
});

app.delete('/books/:id', (req, res) => {
    const bookID = req.params.id;
    booksRepo.deleteBook(bookID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting book');
        } else {
            res.status(200).send('Book deleted successfully');
        }
    });
});

// LoanHeader routes
app.get('/loanheaders', (req, res) => {
    loanHeaderRepo.getAllLoanHeaders((err, loanHeaders) => {
        if (err) {
            res.status(500).send('Error getting loan headers');
        } else {
            res.render('loanheaders', { loanHeaders });
        }
    });
});

app.post('/loanheaders', (req, res) => {
    const { patronID, branchID, beginDate, expectedReturn, overdueFee } = req.body;
    loanHeaderRepo.addLoanHeader(patronID, branchID, beginDate, expectedReturn, overdueFee, (err, result) => {
        if (err) {
            res.status(500).send('Error adding loan header');
        } else {
            res.redirect('/loanheaders');
        }
    });
});

app.put('/loanheaders/:id', (req, res) => {
    const loanID = req.params.id;
    const { patronID, branchID, beginDate, expectedReturn, overdueFee } = req.body;
    loanHeaderRepo.updateLoanHeader(loanID, patronID, branchID, beginDate, expectedReturn, overdueFee, (err, result) => {
        if (err) {
            res.status(500).send('Error updating loan header');
        } else {
            res.status(200).send('Loan header updated successfully');
        }
    });
});

app.delete('/loanheaders/:id', (req, res) => {
    const loanID = req.params.id;
    loanHeaderRepo.deleteLoanHeader(loanID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting loan header');
        } else {
            res.status(200).send('Loan header deleted successfully');
        }
    });
});

// LoanDetails routes
app.get('/loandetails', (req, res) => {
    loanDetailsRepo.getAllLoanDetails((err, loanDetails) => {
        if (err) {
            res.status(500).send('Error getting loan details');
        } else {
            res.render('loandetails', { loanDetails });
        }
    });
});

app.post('/loandetails', (req, res) => {
    const { loanID, bookID, individualFee } = req.body;
    loanDetailsRepo.addLoanDetail(loanID, bookID, individualFee, (err, result) => {
        if (err) {
            res.status(500).send('Error adding loan detail');
        } else {
            res.redirect('/loandetails');
        }
    });
});

app.put('/loandetails/:id', (req, res) => {
    const detailID = req.params.id;
    const { loanID, bookID, individualFee } = req.body;
    loanDetailsRepo.updateLoanDetail(detailID, loanID, bookID, individualFee, (err, result) => {
        if (err) {
            res.status(500).send('Error updating loan detail');
        } else {
            res.status(200).send('Loan detail updated successfully');
        }
    });
});

app.delete('/loandetails/:id', (req, res) => {
    const detailID = req.params.id;
    loanDetailsRepo.deleteLoanDetail(detailID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting loan detail');
        } else {
            res.status(200).send('Loan detail deleted successfully');
        }
    });
});

/*
    LISTENER
*/

app.listen(PORT, HOSTNAME, function() {
    console.log(`Express started on http://${HOSTNAME}:${PORT}; press Ctrl-C to terminate.`);
});
