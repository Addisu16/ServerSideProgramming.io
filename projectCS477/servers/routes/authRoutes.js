const authRoutes=require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.post('/login', authRoutes.login);
router.use(authRoutes.verifyToken);

module.exports = router;

