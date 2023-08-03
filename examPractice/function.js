const express=require('express');
const app=express();

const port=2020;
app.use(x);
function x(res,req,next){
    req.send('Done');
}





app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})