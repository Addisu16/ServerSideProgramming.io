
const Student=require('../models/student');

// API to save/update a student
// API to save/update a student
// API to update a student's information





exports.fetchAll = async (req, res) => {
    try {
        const stuInfo = await Student.findOne({});
        res.status(200).json(stuInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.' });
    }
};
exports.upsertStudent = async (req, res, next) => {
//const studentId = req.body.studentId;
    const update =req.body;


        const existingStudent = await Student.findOne({ _id:req.params._id });

        if (existingStudent) {
            // Update the existing student with the data from req.body
            const result = await Student.findOneAndUpdate(
                { _id:req.paams._id },
                update, // Use the req.body data to update
                { new: true }
            );

            res.status(200).json(result);
        } else{
            // Insert a new student
            const newStudent = new Student(update);
            const savedStudent = await newStudent.save();
            res.status(200).json(savedStudent);
        }
    

};


// API to get a single course of a particular student based on student Id and course Id
// exports.getStudentIDCID=async (req, res) => {
//     try {
//         const studentId = req..studentId;
//         const courseId = req.params.courseId;

//         const student = await Student.findOne({ studentId });

//         if (!student) {
//             res.status(404).json({ message: 'Student not found.' });
//             return;
//         }

//         const course = student.courses.find(course => course.courseId === courseId);

//         if (!course) {
//             res.status(404).json({ message: 'Course not found for this student.' });
//             return;
//         }

//         res.status(200).json(course);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred.' });
//     }
// };

// // API to get the average grade of a student
// exports.getByAverage=async (req, res) => {
//     try {
//         const studentId = req.params.studentId;
//         const semesterFilter = req.query.semester;

//         const student = await Student.findOne({ studentId });

//         if (!student) {
//             res.status(404).json({ message: 'Student not found.' });
//             return;
//         }

//         const filteredCourses = semesterFilter ?
//             student.courses.filter(course => course.semester === semesterFilter) :
//             student.courses;

//         if (filteredCourses.length === 0) {
//             res.status(404).json({ message: 'No courses found for this semester.' });
//             return;
//         }

//         const totalGrade = filteredCourses.reduce((sum, course) => sum + course.grade, 0);
//         const averageGrade = totalGrade / filteredCourses.length;

//         res.status(200).json({ averageGrade });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred.' });
//     }
// };


