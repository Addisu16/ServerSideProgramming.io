const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const bookRouter = require('./routes/bookRouter');
const authRouter = require('./routes/auth');
const User = require('./models/users');

User.init(); 



app.use(authRouter); 


const app = express();

app.use(cors());
app.use(express.json());

app.use('/books', bookRouter);

app.use((err,req,res,next)=>{
   console.log(err);
})


mongoose.connect('mongodb://127.0.0.1:27017/Books')
.then(()=>{
   app.listen(3000, () => console.log('listening on 3000'));
});
 

