const Book = require('../models/book');

exports.fetchAll = async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json(books);
};

exports.fetchById = async (req, res, next) => {
const books=await Book.findById(req.params.id);
res.json(books);
}

exports.save = async(req, res, next) => {
      const savedBooks=await new Book(req.body).save();
      res.status(201).json(savedBooks);
}

exports.update = async (req, res, next) => {
     const updatedBook=await Book.updateOne({_id:req.params.id},req.body,{new:true});
     res.json(updatedBook);
      
}

exports.deleteById = async (req, res, next) => {
    const deletedBook = await Book.deleteOne({_id:req.params.id},{new:true});
    res.json(deletedBook);
}

