const Product = require('../models/product');


exports.fetchAll = async (req, res, next) => {
  const products = await Product.getAll();
  res.status(200).json(products);
};

exports.fetchById = (req, res, next) => {
  console.log(req.params);
  res.json(Product.getById(req.params.productId));
};

exports.save = (req, res, next) => {
  const prod = new Product(ObjectId(req.body.ObjectId), req.body.title, req.body.price, req.body.description);
  res.json(prod.save());
};

exports.update = (req, res, next) => {
  new Product(req.params.productId, req.body.title, req.body.price, req.body.description).update();
  res.status(204).end();
};

exports.deleteById = (req, res, next) => {
  Product.deleteById(req.params.productId);
  res.status(204).end();
};
