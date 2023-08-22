const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student-course-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
