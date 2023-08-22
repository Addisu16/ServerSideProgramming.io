const express=require('express');
const StudentRoutes=require('../controllers/studentGradeControllers');
const router=express.Router();




router.get('/:_id/getAverage',StudentRoutes.getStudentAverage);
router.get('/',StudentRoutes.fetchAll);
//router.get('/',StudentRoutes.getStudent);
router.get('/:ID/grade-stats',StudentRoutes.getGrade);
router.get('/filter',StudentRoutes.filterByGender);
router.get('/filter/below',StudentRoutes.getStudentsBelow80);
//router.post()


module.exports=router;