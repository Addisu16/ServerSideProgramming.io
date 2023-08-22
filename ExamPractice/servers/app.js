const express=require('express');
const cors=require('cors');
const productRoutes=require('./routes/productRouter');

const getDB=require('./utils/database');

//instantiation
const app=express();


//configuration 


//middleware
app.use(cors());
app.use(express.json());
app.use('/products',productRoutes);




app.use((err,req,res,next)=>{
    console.log(err);
})


//startup
let server;
getDB(function(){
    const server=app.listen(3000);
});

function shutDown(){
    server.close(()=>{
        process.exit(0);
    });

}

process.on('SIGINT',shutDown);


