const app=require('express');
const fs=require('fs');
const path=require('path');
const app=express();


app.Request('/',(req,res,next)=>{
    fs.createReadStream(__dirname, 'views','add-Product.html').pipe(res)
});

app.use(express.urlendcoded({extended:true}));
app.use('/',(req,res,next))
app.listen(3000);