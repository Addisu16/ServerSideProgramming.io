const express = require('express');
const fs = require('fs');
const path=require('path');

const app = express();
// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Function to read the database.txt file and parse the data into an object
function readDatabase() {
  const data = fs.readFileSync('database.txt', 'utf8');
  const pairs = data.split(',');

  const db = {};
  pairs.forEach((pair) => {
    const [username, password] = pair.split('=');
    db[username] = password;
  });

  return db;
}

// Function to validate user credentials
function validateUser(username, password) {
  const db = readDatabase();
  return db[username] === password;
}

// Route to serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'login.html'));
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const {username,password} = req.body;

  if (!username || !password) {
    res.send(`<p>Please enter username and password</p><a href="/">Back to login</a>`);
  } else if (validateUser(username, password)) {
    res.send(`<p>Welcome ${username}</p>`);
  } else {
    res.send(`<p>Incorrect username or password</p><a href="/">Back to login</a>`);
  }
});

// Route to handle 404 Not Found
app.use((req, res) => {
  res.status(404).send('Page NOT Found');
});

// Start the server
app.listen(8080);


