const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/category.controller');

router.route('/categories/:ids/questions')
    .get(categoryControllers.getQuestionsByCategories);


router.route('/categories')
    .get(categoryControllers.getCategories);

module.exports = router;