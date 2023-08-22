
//test
const express=require('express');
const app=express();

app.use((req,res,next)=>{
    console.log('1');

}),((req,res,next)=>{
    console.log('2');
}),((req,res,next)=>{
     console.log('3');
})
app.use((req,res,next)=>{
     console.log('4');
     res.send('Hi');
});

app.listen(3000)