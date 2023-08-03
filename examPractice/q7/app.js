const express=require('express');
const path=require('path');
const app=express();


app.use((req,res,next)=>{
    res.status(500).send('Something wrong');
});
app.use((req,res,next)=>{
    res.status(200).send('welcome');
  

});


app.listen(3000);