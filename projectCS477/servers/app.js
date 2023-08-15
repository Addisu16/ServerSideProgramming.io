// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');

const userRouter=require('./routes/userRoutes');
const authRouter=require('./routes/authRoutes');
const tweetRoutes=require('./routes/tweetsRoutes');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

//middleware
app.use('/users',userRouter);
app.use(authRouter);
app.use('/tweets',tweetRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialmedia').then(()=>{
    app.listen(3000,()=>{
        console.log(`Server running at 3000`)
    })
      

});




