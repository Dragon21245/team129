const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to pass error messages to the views
app.use((req, res, next) => {
    res.locals.errorMessage = null;
    next();
});

// Route for the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for searching loans by patron phone number
app.get('/search-loans', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    loanHeaderRepo.getLoanByPhoneNumber(phoneNumber, (error, results) => {
        if (error) {
            res.locals.errorMessage = 'Error searching loans. Please try again later.';
            res.render('index'); // Adjust this to the appropriate view
        } else {
            res.json(results);
        }
    });
});

// Books routes
app.get('/books', (req, res) => {
    booksRepo.getAllBooks((err, books) => {
        if (err) {
            res.locals.errorMessage = 'Error getting books';
            res.render('books', { books: [] });
        } else {
            res.render('books', { books });
        }
    });
});

app.post('/books', (req, res) => {
    const { title, author, isbn, branchID } = req.body;
    booksRepo.addBook(title, author, isbn, branchID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error adding book';
            res.render('books', { books: [] });
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
            res.locals.errorMessage = 'Error updating book';
        } else {
            res.status(200).send({ redirect: '/books' });
        }
    });
});

app.delete('/books/:id', (req, res) => {
    const bookID = req.params.id;
    booksRepo.deleteBook(bookID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error deleting book';
        } else {
            res.status(200).send({ redirect: '/books' });
        }
    });
});

// Branches routes
app.get('/branches', (req, res) => {
    branchesRepo.getAllBranches((err, branches) => {
        if (err) {
            res.locals.errorMessage = 'Error getting branches';
            res.render('branches', { branches: [] });
        } else {
            res.render('branches', { branches });
        }
    });
});

app.post('/branches', (req, res) => {
    const { branchDescription } = req.body;
    branchesRepo.addBranch(branchDescription, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error adding branch';
            res.redirect('/branches');
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
            res.locals.errorMessage = 'Error updating branch';
        } else {
            res.status(200).send({ redirect: '/branches' });
        }
    });
});

app.delete('/branches/:id', (req, res) => {
    const branchID = req.params.id;
    branchesRepo.deleteBranch(branchID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error deleting branch';
        } else {
            res.status(200).send({ redirect: '/branches' });
        }
    });
});

// Genres routes
app.get('/genres', (req, res) => {
    genresRepo.getAllGenres((err, genres) => {
        if (err) {
            res.locals.errorMessage = 'Error getting genres';
            res.render('genres', { genres: [] });
        } else {
            res.render('genres', { genres });
        }
    });
});

app.post('/genres', (req, res) => {
    const { genreName } = req.body;
    genresRepo.addGenre(genreName, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error adding genre';
            res.redirect('/genres');
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
            res.locals.errorMessage = 'Error updating genre';
        } else {
            res.status(200).send({ redirect: '/genres' });
        }
    });
});

app.delete('/genres/:id', (req, res) => {
    const genreID = req.params.id;
    genresRepo.deleteGenre(genreID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error deleting genre';
        } else {
            res.status(200).send({ redirect: '/genres' });
        }
    });
});

// Patrons routes
app.get('/patrons', (req, res) => {
    patronsRepo.getAllPatrons((err, patrons) => {
        if (err) {
            res.locals.errorMessage = 'Error getting patrons';
            res.render('patrons', { patrons: [] });
        } else {
            res.render('patrons', { patrons });
        }
    });
});

app.post('/patrons', (req, res) => {
    const { email, dues, phoneNumber } = req.body;
    patronsRepo.addPatron(email, dues, phoneNumber, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error adding patron';
            res.redirect('/patrons');
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
            res.locals.errorMessage = 'Error updating patron';
        } else {
            res.status(200).send({ redirect: '/patrons' });
        }
    });
});

app.delete('/patrons/:id', (req, res) => {
    const patronID = req.params.id;
    patronsRepo.deletePatron(patronID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error deleting patron';
        } else {
            res.status(200).send({ redirect: '/patrons' });
        }
    });
});

// Loans routes
app.get('/loans', (req, res) => {
    loanHeaderRepo.getAllLoans((err, loans) => {
        if (err) {
            res.locals.errorMessage = 'Error getting loans';
            res.render('loans', { loans: [], loanDetails: [] });
        } else {
            loanDetailsRepo.getAllLoanDetails((err, loanDetails) => {
                if (err) {
                    res.locals.errorMessage = 'Error getting loan details';
                    res.render('loans', { loans, loanDetails: [] });
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
            res.locals.errorMessage = 'Error adding loan';
            res.redirect('/loans');
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
            res.locals.errorMessage = 'Error updating loan';
        } else {
            res.status(200).send({ redirect: '/loans' });
        }
    });
});

app.delete('/loans/:id', (req, res) => {
    const loanID = req.params.id;
    loanHeaderRepo.deleteLoan(loanID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error deleting loan';
        } else {
            res.status(200).send({ redirect: '/loans' });
        }
    });
});

// LoanDetails routes within Loans
app.post('/loan-details', (req, res) => {
    const { loanID, bookID, individualFee } = req.body;
    loanDetailsRepo.addLoanDetail(loanID, bookID, individualFee, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error adding loan detail';
        } else {
            res.status(200).send({ redirect: '/loans' });
        }
    });
});

app.put('/loan-details/:id', (req, res) => {
    const detailID = req.params.id;
    const { loanID, bookID, individualFee } = req.body;
    loanDetailsRepo.updateLoanDetail(detailID, loanID, bookID, individualFee, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error updating loan detail';
        } else {
            res.status(200).send({ redirect: '/loans' });
        }
    });
});

app.delete('/loan-details/:id', (req, res) => {
    const detailID = req.params.id;
    loanDetailsRepo.deleteLoanDetail(detailID, (err, result) => {
        if (err) {
            res.locals.errorMessage = 'Error deleting loan detail';
        } else {
            res.status(200).send({ redirect: '/loans' });
        }
    });
});

// Start the server
app.listen(PORT, HOSTNAME, function() {
    console.log(`Express started on http://${HOSTNAME}:${PORT}; press Ctrl-C to terminate.`);
});
