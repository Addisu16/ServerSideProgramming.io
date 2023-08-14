
const express=require('express');
const studentRoutes=require('./routes/stdentGradeRoutes')
const mongoose=require('mongoose');
const app=express();



app.use(express.json());

app.use('/studentsgrade',studentRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/StudentGrade')
.then(()=>{
    app.listen(2000);
})
