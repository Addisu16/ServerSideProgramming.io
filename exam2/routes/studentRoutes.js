const studentRoutes=require('../controllers/studentControllers');
const express=require('express');
const student = require('../models/student');

const routes=express.Router();
routes.get('/:_id/courses/:courseId',studentRoutes.getCourseByIdandCourseId);
routes.post('/:_id',studentRoutes.postCourse);
routes.get('/',studentRoutes.fetchStudents);
routes.post('/:studentId',studentRoutes.fetchById);
//routes.put('/',studentRoutes.saveStudent);
routes.put('/:_id',studentRoutes.findAndUpdateStudent)
//routes.get('/:studentId/courses/:courseId',studentRoutes.getCourse);

routes.get('/:studentId/getAverage',studentRoutes.getStudentAverageBySemester);




module.exports=routes;