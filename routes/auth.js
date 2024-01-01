const express = require('express');
const { login, register, verification, resetPassword, authenticateUser } = require('../controllers/auth.controller');
const router = express.Router();

router.route('/login').post(login);

router.route('/register').post(register);

router.route('/verification').post(verification);

router.route('/reset-password').post(resetPassword);

router.route('/whoami').get(authenticateUser);

module.exports = router;