const express = require('express');
const { googleRegister } = require('../controllers/google.controller');
const router = express.Router();

router.route('/register').post(googleRegister);

module.exports = router;