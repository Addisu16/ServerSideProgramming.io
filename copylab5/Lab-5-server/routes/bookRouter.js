const express = require('express');
const bookRouter=require('../controllers/bookController');
const router = express.Router();

router.get('/',bookRouter.fetchAll);
router.post('/',bookRouter.submit);
router.put('/:id',bookRouter.update);
router.delete('/:id',bookRouter.deleteById);


module.exports = router;