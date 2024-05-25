const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./database/db-connector'); // Importing the database connector

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
app.set('views', path.join(__dirname, 'public'));

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use method-override to support PUT and DELETE methods in forms
app.use(methodOverride('_method'));

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for searching loans by patron phone number
app.get('/search-loans', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    loanHeaderRepo.getLoanByPhoneNumber(phoneNumber, (error, results) => {
        if (error) {
            console.error('Error searching loans:', error);
            res.status(500).send('Error searching loans. Please try again later.');
            return;
        }
        res.json(results);
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

// Loans routes
app.get('/loans', (req, res) => {
    loanHeaderRepo.getAllLoans((err, loans) => {
        if (err) {
            res.status(500).send('Error getting loans');
        } else {
            loanDetailsRepo.getAllLoanDetails((err, loanDetails) => {
                if (err) {
                    res.status(500).send('Error getting loan details');
                } else {
                    res.render('loans', { loans, loanDetails });
                }
            });
        }
    });
});

app.post('/loans', (req, res) => {
    const { patronID, branchID, beginDate, expectedReturn, overDueFee } = req.body;
    loanHeaderRepo.addLoan(patronID, branchID, beginDate, expectedReturn, overDueFee, (err, result) => {
        if (err) {
            res.status(500).send('Error adding loan');
        } else {
            res.redirect('/loans');
        }
    });
});

app.put('/loans/:id', (req, res) => {
    const loanID = req.params.id;
    const { patronID, branchID, beginDate, expectedReturn, overDueFee } = req.body;
    loanHeaderRepo.updateLoan(loanID, patronID, branchID, beginDate, expectedReturn, overDueFee, (err, result) => {
        if (err) {
            res.status(500).send('Error updating loan');
        } else {
            res.status(200).send('Loan updated successfully');
        }
    });
});

app.delete('/loans/:id', (req, res) => {
    const loanID = req.params.id;
    loanHeaderRepo.deleteLoan(loanID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting loan');
        } else {
            res.status(200).send('Loan deleted successfully');
        }
    });
});

// LoanDetails routes within Loans
app.post('/loan-details', (req, res) => {
    const { loanID, bookID, individualFee } = req.body;
    loanDetailsRepo.addLoanDetail(loanID, bookID, individualFee, (err, result) => {
        if (err) {
            res.status(500).send('Error adding loan detail');
        } else {
            res.redirect('/loans');
        }
    });
});

app.put('/loan-details/:id', (req, res) => {
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

app.delete('/loan-details/:id', (req, res) => {
    const detailID = req.params.id;
    loanDetailsRepo.deleteLoanDetail(detailID, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting loan detail');
        } else {
            res.status(200).send('Loan detail deleted successfully');
        }
    });
});

// Start the server
app.listen(PORT, HOSTNAME, function() {
    console.log(`Express started on http://${HOSTNAME}:${PORT}; press Ctrl-C to terminate.`);
});
