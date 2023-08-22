const express=require('express');
const studentControllers=require('../controllers/studentControllers');


const routes=express.Router();


routes.get('/',studentControllers.fetchAll)
//routes.get(':studentId/getAverage',studentControllers.getByAverage)
routes.post('/',studentControllers.upsertStudent);
//routes.put('/:id',studentControllers.upsertStudent);


module.exports=routes;