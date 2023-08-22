const express=require('express');
const productController=require('../controllers/productController')
const router=express.Router();

router.get('/',productController.fetchAll);
router.get('/:productId',productController.fetchById);
router.post('/',productController.save);
router.put('/:id',productController.update);
router.delete('/:id',productController.deleteById);



module.exports=router;