const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const studentSchema=new Schema({
    studentId:{type:String,required:true,unique:true},
    firstname:{type:String,unique:true},
    lastname:String,
courses:[
    {
    courseId:String,
    coursename:String,
    semester:String,
    grade:Number
}
]
 
});

module.exports=mongoose.model('Student',studentSchema);
