const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.route('/count')
    .get(questionController.countQuestions);

router.route('/:id/votes/:voteId')
    .patch(questionController.updateQuestionVote)
    .delete(questionController.deleteQuestionVote)

router.route('/:id/votes')
    .get(questionController.getQuestionVotes)
    .post(questionController.createQuestionVote)


router.route('/:id/categories')
    .get(questionController.getQuestionCategories)
    .post(questionController.createQuestionCategories)

router.route('/:id/comments')
    .get(questionController.getQuestionComments)

router.route('/:id')
    .get(questionController.getQuestion) 

router.route('/')
    .get(questionController.getQuestions)  


module.exports = router;