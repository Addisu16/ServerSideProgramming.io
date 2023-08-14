const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const studentGradeSchema=new Schema({
    ID:{type:String,unique:true,required:true},
    firstName:String,
    lastName:String,
    Gender:String,
    Grades:[Number]
});


module.exports=mongoose.model('Studentgrade',studentGradeSchema);