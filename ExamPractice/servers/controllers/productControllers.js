

const Product=require('../models/product');


exports.fetchAll=async (req,res,next)=>{
    const products=await Product.getAll();
    res.status(200).json(products);
};

exports.fetchById=(req,res,next)=>{
    res.json(Product.finById(req.params.id));
};
exports.saveProduct=(req,res,next)=>{
    const prod=new Product(req.params.id,req,body,title,req.body.description,req.body.price);
     res.json(prod.save());

}
exports.UpdateProduct=(req,res,next)=>{
   new Product(req.params.id,req.body.title,req.body.description,req.body.price).update();
    res.status(204).end();
}
exports.deleteById=(req,res,next)=>{
    Product.deleteById(req.params.id);
    res.status(204).end();
    
}