const express = require('express');
const fs = require('fs');
const app = express();

// Configuration
const port = process.env.PORT || 3000;
app.set('port', port);

// Middleware
app.use((req, res, next) => {
    console.log('Saving successful');
    next();
});

app.use('/blog', (req, res, next) => {
    // Send the 'signup.html' file as the response
    const getBlogContent=fs.readdirSync(__dirname +'/blog.html')
    res.send(getBlogContent);
});

app.use('/', function (req, res, next) {
    // Send the 'signup.html' file as the response
    const getBlogContent=fs.readFileSync(__dirname + '/blog.html')
    res.sendFile(__dirname + '/blog.html','utf8');
    res.send(getBlogContent);
});

// Bootup
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

