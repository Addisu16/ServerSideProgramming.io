
const Student = require('../models/student');


exports.fetchStudents = async (req, res, next) => {
  const studentList = await Student.find({});
  if (studentList) {
    res.json(studentList);
  }
  else {
    res.status(404).json({ message: 'could not find the student' });
  }
}

exports.fetchById = async (req, res, next) => {
  const findStudent = await Student.findOne({ studentId: req.params.studentId });
  console.log(findStudent);
  if (findStudent) {
    res.status(200).json(findStudent);
  } else {
    res.status(404).json({ message: 'could not find the student' });
  }

}
//update and save student 

exports.saveStudent = async (req, res, next) => {
  try {
    const studentID = req.body.studentId;
    console.log(studentID);

    const findStudent = await Student.findOne({ studentId: studentID }); //find student by id

    if (findStudent) {
      await findStudent.set(req.body).save();
      //await findStudent.save();
      //Object.assign(findStudent,req.body);
      console.log(findStudent);
      res.json(findStudent);
    } else {
      const student = new Student(req.body);
      console.log(student);
      await student.save();
      res.status(201).json(student);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// exports.getCourse=async(req,res,next)=>{
//     try{
//         const studentId=req.params.studentId;
//         console.log(studentId)
//         const courseID=req.params.courseId;
//         console.log(courseID);
//        const student=await Student.findOne({studentId});
//        console.log(student);
//        if(!student){
//          return res.status(404).json({message:'Student not Found'});

//        }
//      const course=student.courses.find((c)=>c.courseId===courseID);
//      console.log(course);
//      if(!course){
//       return res.status(404).json({message:'course not found for this Student '});
//      }
//      res.json(course);
//     }catch(error){
//       res.status(500).json({message:error.message});
//     }
// };



exports.getStudentAverageBySemester = async (req, res) => {

    const student = await Student.findOne({studentId:req.params.studentId});
   
    if(student){
      const semester = student.courses.filter(o => o.semester === req.query.semester);
      const average = semester.reduce((sum, course) => sum + course.grade, 0)/semester.length;

    res.status(200).json(average);
    }else{
     res.status(400).json({message:'studentNot Foud'});
    
  }
};










exports.postCourse = async (req, res) => {
  let student = await Student.findById({ _id: req.params._id });
  let course = student.courses;
  if (student) {
    const { courseId, coursename, semester, grade } = req.body;
    const courses1 = { courseId, coursename, semester, grade }
    course.push(courses1)
    const addedCourse= await student.save();
    res.status(200).json(addedCourse);

  }

}

exports.getCourseByIdandCourseId = async (req, res) => {
  let student = await Student.findById(req.params._id);
  if (student) {
    let course=student.courses.filter((c)=>c.courseId===req.params.courseId);
    res.status(200).json(course);
  }else{
    res.status(404).json({message:'Not Found'});
  }

}




exports.findAndUpdateStudent = async (req, res) => {

    const student = await Student.findById(req.params._id); // Find student by ID
    const { courseId } = req.query;
    if (student) {
      const course = student.courses.find(c => c.courseId === courseId); // Find course by courseId
      if (course) {
        await Object.assign(student,req.body).save();
        // await student.set(req.body).save();
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Course not found for this student' });
      }
    }
};





exports.findAndUpdateStudent1 = async (req, res) => {
  try {
    const { _id } = req.params;
    const { courseId } = req.query;
    const { grade } = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { _id, 'courses.courseId': courseId }, // Find the specific student and course
      { $set: { 'courses.$.grade': grade } }, // Update the grade for the course
      { new: true } // Return the updated document
    );

    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student or course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


