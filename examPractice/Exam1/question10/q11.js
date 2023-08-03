const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"signup.html"));
});

app.post('/signup',(req,res)=>{
    if(req.body.firstname && req.body.lastname){
    let data=fs.readFileSync('database.txt','utf8');
    data+=','+ req.body.firstname + " "+ req.body.lastname;
    fs.writeFileSync('database.txt',data);
    res.send('save successful')
    }else{
        res.sendFile(path.join(__dirname,'signup.html'));
    }
});
app.use((req,res)=>{
    res.status(404).send('Try Later');
})
app.listen(2000);