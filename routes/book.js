const express = require('express');
const router =express.Router();
const { Book, Sequelize } = require("../models");
const entriesPerPage = 15;
const Op = Sequelize.Op;
router.use(express.urlencoded({ extended: false }));

const asyncHandler = cb => {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

// GET the paginated list of books
router.get('/', asyncHandler( async(req, res) => {
    res.redirect('/books/list/1');
}));

router.get('/list/:page', asyncHandler( async(req, res) => {
    const allBooks = await Book.findAll();
    const totalPages = Math.ceil(allBooks.length/entriesPerPage);
    const page = req.params.page;
    const offset = (page - 1)*entriesPerPage;
    const books = await Book.findAll({
        order: [['title']],
        offset,
        limit: entriesPerPage
    });
    res.render('index', {
        title: 'Index',
        books,
        page,
        totalPages
    });
}));

// GET the list of search results
router.post('/search-results', asyncHandler( async(req,res) => {
    let books;
    const { body } = req;
    console.log(body);
    if (body.category === 'title') {
        books = await Book.findAll({
            where: {
                title: {
                    [Op.like]: `%${body.keyword}%`
                }},
            order: [['title']]});
        res.render('index', { title: "Search Results", books });
    } else if (body.category === 'author') {
        books = await Book.findAll({
            where: {
                author: {
                    [Op.like]: `%${body.keyword}%`
                }},
            order: [['title']]});
        res.render('index', { title: "Search Results", books });
    } else if (body.category === 'genre') {
        books = await Book.findAll({
            where: {
                genre: {
                    [Op.like]: `%${body.keyword}%`
                }},
            order: [['title']]});
        res.render('index', { title: "Search Results", books });
    } else if (body.category === 'year') {
        books = await Book.findAll({
            where: {
                year: {
                    [Op.and]: {
                        [Op.gt]: body.from,
                        [Op.lt]: body.to
                    }
                }
            },
            order: [['title']]
        });
        res.render('index', { title: "Search Results", books});
    }
}));

// GET the create new book form
router.get('/new', (req, res) => {
    res.render('new-book', { title: "New Book" });
});

// POST the new book to the database
router.post('/new', asyncHandler(async(req, res) => {
    try {
        await Book.create(req.body);
        res.redirect('/books');
    } catch (err) {
        if(err.name === "SequelizeValidationError") {
            const book = await Book.build(req.body);
            res.render('new-book', { title: "New Book", book, errors: err.errors })
        } else {
            throw err;
        }
    }
}));

// GET the detail of the book with specified id
router.get('/:id', asyncHandler( async(req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        res.render('update-book', {book, title: "Update Book"});
    } else {
        next();
    };
}));

// Update book info in the database
router.post('/:id', asyncHandler( async(req, res, next) => {
    let book;
    try{
        book = await Book.findByPk(req.params.id);
        if(book) {
            await book.update(req.body);
            res.redirect('/books');
        } else {
            next();
        }
    } catch(err) {
        if(err.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            book.id = req.params.id;
            res.render('update-book', { book, title: 'Update Book', errors: err.errors });
        } else {
            throw error;
        }
    };
}));

// Deletes a book
router.post('/:id/delete', asyncHandler( async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        await book.destroy();
        res.redirect('/books');
    } else {
        next();
    };
}));

module.exports = router;
