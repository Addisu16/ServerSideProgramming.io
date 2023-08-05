const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router(); // Note the correct method name is Router() with capital R

router.get('/add', (req, res, next) => {
  fs.createReadStream(path.join(__dirname,'..', 'views', 'users.html')).pipe(res);

});

router.post('/add', (req, res, next) => {
    res.send(`user added successfully`);
});

module.exports = router;
