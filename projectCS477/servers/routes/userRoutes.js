const express=require('express');
const routes=express.Router();
const userController=require('../controllers/userControllers');
const authController=require('../controllers/authController')

routes.post('/',authController.login);
routes.post('/signup',userController.signup);


module.exports=routes;