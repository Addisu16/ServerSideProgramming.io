const express = require('express');
const cors = require('cors');

const bookRouter = require('./routes/bookRouter');

const { createDB, closeConnection } = require('./utils/database');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/books', bookRouter);

let server;
createDB(() => {
   server = app.listen(3000, () => console.log('listening on 3000'));
});


function gracefulshutdown() {
   console.log("Shutting down");
   server.close(() => {
       console.log("HTTP server closed.");
       closeConnection();
       // When server has stopped accepting connections 
       // exit the process with exit status 0
       process.exit(0); 
   });
}

process.on("SIGINT", gracefulshutdown);