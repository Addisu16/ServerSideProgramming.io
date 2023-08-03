const express=require('express');
const fs=require('fs');
const app=express();

app.get('/users',(req,res,next)=>{
    console.log(1);
    next();
},(req,res,next)=>{
    console.log(2);
    next('sth');
},(req,res,next)=>{
    console.log(2);
    next('route');
});

app.post('/users',(req,res,next)=>{
    console.log(4);
    res.status(200).send('Success 1 !');
});

app.get('/users',(req,res,next)=>{
    console.log(5);
    res.status(200).send('success 2!');
});

app.use('/users', (err,req,res,next)=>{
    console.log(6);
    res.status(500).send('Try Later');
});


app.listen(27);