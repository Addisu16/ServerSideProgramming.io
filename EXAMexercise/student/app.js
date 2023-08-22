const mongoose=require('mongoose');

const express=require('express');
const studentRoute=require('./servers/routes/studentRoutes');

const app=express();





//middlware

app.use('/students',studentRoute);



mongoose.connect('mongodb://127.0.0.1:27017/Student')
.then(()=>{
    app.listen(3000);
})
    