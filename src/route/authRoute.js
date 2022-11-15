const express = require('express');
const AuthController = require('../controllers/Auth/AuthController');
const UserValidator = require('../validator/User/UserValidator');

const router = express.Router();
const auth = require('../middlewares/auth');
const myLogger = require('../middlewares/testMiddleWare');

const authController = new AuthController();
const userValidator = new UserValidator();

router.use(myLogger());
router.post('/register', userValidator.userCreateValidator, authController.register);
router.post('/email-exists', userValidator.checkEmailValidator, authController.checkEmail);
router.post('/login', userValidator.userLoginValidator, authController.login);
router.post('/refresh-token', authController.refreshTokens);
router.post('/logout', authController.logout);
router.put(
    '/change-password',
    auth(),
    userValidator.changePasswordValidator,
    authController.changePassword,
);

module.exports = router;
