const jwt = require('jsonwebtoken');

const User = require('../models/users');
const accessTokenSecret = "msd2023";

exports.login = (req, res, next) => {
    const { username, password } = req.body; // Destructure username and password
    const user = new User(username, password, null).login(); // 
    
    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
        res.json({ accessToken });
    } else {
        res.status(401).json({ 'error': 'Username or password invalid' }); // Use status 401 for unauthorized
    }
}

exports.authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ "error": "Forbidden" }); // Use status 403 for forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ "error": "Authorization header missing" });
    }
}

exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ "error": "Access denied. Admin role required." });
    }
}
