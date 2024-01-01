const { StatusCodes } = require('http-status-codes');
const { memberService, questionService, commentService } = require('../services')

const countMemberComments = async (req, res) => {
    const { id: memberId } = req.params;
    const comments = await commentService.getComments({ memberId, ...req.query });
    const countNumber = comments.length;
    return res.status(StatusCodes.OK).json(countNumber);
}

const countMemberQuestions = async (req, res) => {
    const { id: memberId } = req.params;
    const questions = await questionService.getQuestions({ memberId, ...req.query });
    const countNumber = questions.length;
    return res.status(StatusCodes.OK).json(countNumber);
}

const getMemberQuestions = async (req, res) => {
    const { id: memberId } = req.params;
    const questions = await questionService.getQuestions({ memberId, ...req.query });
    return res.status(StatusCodes.OK).json(questions);
}

const createMemberQuestion = async (req, res) => {
    const { id: memberId } = req.params;
    const question = await questionService.createQuestion({ memberId, ...req.body });
    return res.status(StatusCodes.CREATED).json(question);
}

const getMemberComments = async (req, res) => {
    const { id: memberId } = req.params;
    const comments = await commentService.getComments({ memberId, ...req.query });
    return res.status(StatusCodes.OK).json(comments);
}

const createMemberComments = async (req, res) => {
    const { id: memberId } = req.params;
    const comment = await commentService.createComment({ memberId, ...req.body });
    return res.status(StatusCodes.CREATED).json(comment);
}

const updateMember = async (req, res) => {
    const { id } = req.params;
    const member = await memberService.updateMember(id, req.body);
    return res.status(StatusCodes.OK).json(member);
}

module.exports = {
    getMemberQuestions,
    createMemberQuestion,
    getMemberComments,
    createMemberComments,
    updateMember,
    countMemberQuestions,
    countMemberComments,
}