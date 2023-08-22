const Student = require('../models/grade');



exports.fetchAll = async (req, res) => {
    const stu = await Student.find({});
    if(stu){
    res.status(200).json(stu)
}else{
    res.status(404).json({you:'no student Found'});
}
}


//calculate average,min,max
exports.getGrade = async (req, res) => {
    try {
        const studentId = req.params.ID;
        const student = await Student.findOne({ ID: studentId });
        console.log(student);
        if (!student) {
            return res.status(404).json({ message: 'No students found' });
        }
        // const allGrades=students.reduce((grade,student)=>{
        //     return grade.concat(student.Grades);
        // },[]);
        //console.log(allGrades);

        const studentGrades = student.Grades;
        const averageGrade = studentGrades.reduce((total, grade) => total + grade, 0) / studentGrades.length;
        console.log(averageGrade);
        const maxGrade = Math.max(...studentGrades);
        const minGrade = Math.max(...studentGrades);

        res.json({
            average: averageGrade,
            minimumGrade: minGrade,
            maxGrade: maxGrade
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.filterByGender = async (req, res) => {
    const studentGender = req.query.Gender;
    console.log(studentGender);
    const student = await Student.find({ Gender: studentGender });
    console.log(student);

    if (student.length > 0) {

        res.status(200).json(student);
    } else {
        res.status(404).json({ y: 'Students not found' });
    }
}

exports.getStudentsBelow80 = async (req, res) => {

    try {
        const studentBelow80 = await Student.find({ Grades: { $lt: 80 } });
        console.log(studentBelow80);
        if (studentBelow80.length > 0) {
            //const filterGrade=studentBelow80.filter((g)=>g.Grades<80);
            const filterGrade = studentBelow80.filter((g) => g.Grades.some({grade:{$lt:80}}));
            res.json(filterGrade);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getStudentAverage = async (req, res) => {
    const { firstName, lastName, Gender } = req.query;
    // const obj = {firstName,lastName,Gender};
    const student = await Student.findById({ _id: req.params._id })
    if (firstName && lastName && Gender) {
        const Averagegrades = student.Grades.reduce((tot, grades) => tot + grades, 0) / student.Grades.length;
        res.status(200).json(Averagegrades);
    } else {
        res.status(404).json({ message: 'student not found' });
    }
};
