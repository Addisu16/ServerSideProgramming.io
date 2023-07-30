const express = require('express');
const fs = require('fs');
const app = express();

// Configuration
const port = 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve the home page with the blog post form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/blog.html');
});

// Handle the form submission
app.post('/submit', (req, res) => {
    const { title, body } = req.body;
    const blogPost = { title, body };

    // Save the user's inputs into a file (e.g., blog-posts.txt)
    fs.appendFile('blog-posts.txt', JSON.stringify(blogPost) + '\n', 'utf8', (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data.');
        } else {
            // Display "Save Successfully" page with a link back to the home page
            res.send(`
                <h1>Save Successfully</h1>
                <a href="/">Go back to home page</a> `);
        }
    });
});

// Bootup
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
