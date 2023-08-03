const express=require('express');
const path=require('path');
const app=express();

app.use('/',express.static(path.join(__dirname,'public','asset')));
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(12);