const express=require('express');

const Product=require('../controllers/productControllers');



const router=express.Router();


router.get('/',Product.fetchAll);
router.get('/:id',Product.fetchById);
router.post('/',Product.saveProduct);
router.put('/:id',Product.UpdateProduct);
router.delete('/:id',Product.UpdateProduct);








module.exports=router;