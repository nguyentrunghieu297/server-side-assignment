const router = require('express').Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../controllers/middlewareController');

// [POST] /auth/register
router.post('/register', authController.registerUser);

// [POST] /auth/login
router.post('/login', authController.loginUser);

// [POST] /auth/logout
router.post('/logout', verifyToken, authController.logOut);

module.exports = router;
