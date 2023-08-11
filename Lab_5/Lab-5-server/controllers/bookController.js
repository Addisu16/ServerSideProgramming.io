const Book = require('../models/book');

exports.fetchAll = async (req, res, next) => {
    const books = await Book.getAll();
    res.status(200).json(books);
};

exports.fetchById = async (req, res, next) => {
    res.json(await Book.getById(req.params.id));
}

exports.save = async(req, res, next) => {
    const newBook = new Book( req.body.title, req.body.isbn, req.body.author, req.body.pushlisedDate);
    const result = await newBook.save();
    newBook._id = result.insertedId;
    res.json(newBook);
}

exports.update = async (req, res, next) => {
    await new Book( req.body.title, req.body.isbn, req.body.author, req.body.pushlisedDate).update(req.params.id);
    res.status(204).end();
}

exports.deleteById = async (req, res, next) => {
    const result = await Book.deleteById(req.params.id);
    res.status(204).end();
}

