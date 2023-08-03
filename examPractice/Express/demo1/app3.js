const express=require('express');
const app=express();

app.use('/users/:id',(req,res,next)=>{
    console.log('Request Type: ',req.method);
    next();
});
app.listen(500);