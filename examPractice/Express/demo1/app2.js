const express=require('express');
const app=express();

app.use((req,res,next)=>{
    console.log('Time. ',Date.now())
    next();
})


app.listen(300);

//This function is executed always