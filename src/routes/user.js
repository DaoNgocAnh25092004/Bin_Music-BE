const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../middlewares/authMiddleware');

const userController = require('../controllers/UserController');

router.post('/login-google', (req, res) => userController.loginGoogle(req, res));

router.delete('/logout', (req, res) => userController.logout(req, res));

router.put('/refresh-token', (req, res) => userController.refreshToken(req, res));

router.get('/info-user', isAuthorized, (req, res, next) => userController.infoUser(req, res, next));

module.exports = router;
