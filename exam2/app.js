const express=require('express');
const studentRoutes=require('./routes/studentRoutes');
const mongoose = require('mongoose');

//instantiation

const app=express();



//middleware

app.use(express.json());
app.use('/students',studentRoutes);
app.use((err,req,res,next)=>{
    res.send(404).console.log(err);
})
mongoose.connect(`mongodb://127.0.0.1:27017/Students`)
.then(()=>{
    app.listen(3000,()=>
        console.log(`Server is Running on 3000`)) 
});

