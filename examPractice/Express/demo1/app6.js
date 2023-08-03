

const express=require('express');
const app=express()



function foo(res,req,next){
    console.log('1');
    response.end('Done')
};
app.use(foo);

app.listen(11);