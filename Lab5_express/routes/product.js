const express=require('express');
const fs=require('fs');
const path=require('path');

const router=express.Router();



router.get('/add',(req,res,next)=>{
fs.createReadStream(path.join(__dirname,'..','views','products.html')).pipe(res);

});

router.post('/add',(req,res,next)=>{
    res.send(`product added successfully`);
});

module.exports=router;
