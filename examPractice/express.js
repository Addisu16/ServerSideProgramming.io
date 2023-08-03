const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('output 0');
    next();
});

app.get('/', (req, res, next) => {
    console.log('output 1');
    next();
}), ((req, res, next) => {
    console.log('Output 2');
    next('route');
}, (req, res, next) => {
    console.log('output 3');
    res.end();
});

app.route('/')
    .get((req, res, next) => {
        console.log('Output 4');
        next();
    }, (req, res, next) => {
        console.log('Output 5');
        res.end();
    });

app.listen(2023);


