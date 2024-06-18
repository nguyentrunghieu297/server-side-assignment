const router = require('express').Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../controllers/middlewareController');

// [GET] render login page
router.get('/login', authController.renderLoginPage);

// [GET] /auth/logout
router.get('/logout', authController.logOutServerSide);

// [GET] render register page
router.get('/register', authController.renderRegisterPage);

// [POST] /auth/register
router.post('/register', authController.registerServerSide);

// [POST] /auth/login
router.post('/login', authController.loginServerSide);

module.exports = router;
