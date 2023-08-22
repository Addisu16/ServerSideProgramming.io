const express = require('express');
const fs = require('fs');
const app = express();

// Configuration
const port = process.env.PORT || 3000;
app.set('port', port);

// Middleware
app.use((req, res, next) => {
    console.log('inside no path');
    next();
});

app.use('/signup', (req, res, next) => {
    // Send the 'signup.html' file as the response
    res.sendFile(__dirname + '/signup.html');
});

app.use('/', function (req, res, next) {
    // Send the 'signup.html' file as the response
    res.sendFile(__dirname + '/signup.html');
});

// Bootup
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
