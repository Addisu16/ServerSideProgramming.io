const express=require('express');
const cors=require('cors');



const productRouter=require('./routes/productRouter');
const {createDb}=require('./utils/database');
//instantiation
const app=express();

//configuration



//middleware
app.use(cors());
app.use(express.json());
app.use('/products',productRouter);




createDb(function(){
    app.listen(3000,()=>console.log('listen to 3000'));

});
