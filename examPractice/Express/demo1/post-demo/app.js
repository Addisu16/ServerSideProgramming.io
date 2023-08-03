const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();

app.use(express.urlencoded({extended:true}));

app.use('/add',(req,res,next)=>{
    console.log(req.body);
    res.send('save successful');
});

app.use('/',(req,res,next)=>{
    fs.createReadStream(path.join(__dirname,'views','add.product.html')).pipe(res);

});


app.listen(3000);