const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.route('/count')
    .get(commentController.countComments)

router.route('/:id/votes/:voteId')
    .delete(commentController.deleteCommentVotes)

router.route('/:id/votes')
    .get(commentController.getCommentVotes)
    .post(commentController.createCommentVotes)

    
router.route('/')
    .get(commentController.getComments)

module.exports = router;
