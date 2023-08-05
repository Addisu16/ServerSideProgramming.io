const express=require('express');
const fs=require('fs');
const path=require('path');

const userRouter=require('./routes/users');
const productRouter=require('./routes/product');


const app=express();
const port=3000;
app.use(express.static(path.join(__dirname,'public')));

//pages
app.use('/products',productRouter);
app.use('/users',userRouter);

app.use((req,res,next)=>{
  res.status(404).send('page Not found');
})

app.listen(port,()=>{
  console.log(`port is on:${port}`)
});