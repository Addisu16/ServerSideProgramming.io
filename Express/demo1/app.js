const express=require('express');
//1. instantiation
const app=express();


console.log(process.env.PORT);
//2. configuration

//2a.set

const res=app.set('port',process.env.PORT||3000);
console.log("res"+res);
app.set('port',res);

//2b. disable/enable--by default it is turnrd on

//app.enable('case sensitive routing');

//equal to
app.set('case sensitive routing',true)

//3. middleware//in your project may you will erite a lot of middleware
//middlware is  afunction with theree argument


app.use('/users',(req,res,next)=>{
    res.send('inside users');
})



// 7. bootup
app.listen(3000,()=>{
    console.log('listening 3000');
});

