const books=require('../models/book');

exports.fetchAll= (req,res,next)=>{
    const book= books.getAllBooks();
    res.status(200).json(book);
};

exports.submit=async (req,res,next)=>{
    const book=new books(req.params.id,req.body.title,req.body.ISBN,req.body.publishedDate,req.body.author);
    res.json(book);
};

exports.update=(req,res,next)=>{
    
   books.update(req.params.id,req.body.title,req.body.ISBN,req.body.publishedDate,req.body.author);
    res.send(204).json();
};
exports.deleteById=(req,res,next)=>{
    books.delete(req.params.id);
    res.status(200).end();
}
