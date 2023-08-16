
const User=require('../models/user');
const jwt=require('jsonwebtoken')
const JWT_SECRET = 'CS477-Project';

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        
        next();
    } catch (error) {
        res.status(401).send('Unauthorized.');
    }
};




exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        
        const user = await User.findOne({ username, password });
        if (!user) {
            res.status(401).send('Incorrect username or password.');
            return;
        }
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};