const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer();

const cloudController = require('../controllers/cloud.controller');

router.route('/')
    .post(upload.single('profile_image'), cloudController.uploadFile);

module.exports = router;