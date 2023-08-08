const books=require('../models/book');

exports.fetchAll=(req,res,next)=>{
    const book=books.getAllBooks();
    res.status(200).json(book);
};

exports.submit=(req,res,next)=>{
    const book=new books(req.body.id,req.body.title,req.body.ISBN,req.body.publishedDate,req.body.author);
    res.json(book);
};

exports.update=(req,res,next)=>{
    
    books.update(req.params.id,req.body.title,req.body.ISBN,req.body.publishedDate,req.body.author);
    res.send(204).end();
};
exports.deleteById=(req,res,next)=>{
    books.delete(req.params.id);
    res.status(204).end();
}
