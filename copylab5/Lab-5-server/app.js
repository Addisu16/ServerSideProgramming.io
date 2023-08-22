const express=require('express');
const cors=require('cors');

const bookRouter=require('./routes/bookRouter');


const app=express();


const port=process.env.PORT||2000;


//middleware
app.use(cors());
app.use(express.json());
app.use('/books',bookRouter);

app.listen(port,()=>{
    console.log(`Server is running at http:localhost${port}`);
});

app.use((err,req,res,next)=>{
    res.send(err);
});