const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const studentSchema =new Schema({

studentId: String,
    firstname: String,
    lastname: String,
    courses: [
        {
            courseId: String,
            coursename: String,
            semester: String,
            grade: Number,
        },
    ],
});


module.exports=mongoose.model('Student',studentSchema);