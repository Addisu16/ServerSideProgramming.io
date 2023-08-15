const User=require('../models/user');

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (password.length > 8) {
            const user = new User({ username, password });
            await user.save();
            res.status(201).send('User registered successfully.');
        } else {
            res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};



