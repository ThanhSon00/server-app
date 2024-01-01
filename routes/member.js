const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

router.route('/:id/questions/count')
    .get(memberController.countMemberQuestions);

router.route('/:id/comments/count')
    .get(memberController.countMemberComments)

router.route('/:id/questions')
    .get(memberController.getMemberQuestions) // Get one's questions
    .post(memberController.createMemberQuestion); // Create one's question

router.route('/:id/comments')
    .get(memberController.getMemberComments) // Get one's comment
    .post(memberController.createMemberComments); // Create one's comment

router.route('/:id')
    .patch(memberController.updateMember); // Update member info

module.exports = router;