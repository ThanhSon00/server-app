const { StatusCodes } = require("http-status-codes");
const { questionService, commentService, voteService, categoryService } = require("../services");
const Comment = require("../models/Comment");
const { Member, Vote } = require("../models");

const countQuestions = async (req, res) => {
    const questions = await questionService.getQuestions(req.query);
    const countNumber = questions.length;
    return res.status(StatusCodes.OK).json(countNumber);
}

const createQuestionCategories = async (req, res) => {
    const { id } = req.params;
    const categories = await categoryService.createCategories(req.body);
    const question = await questionService.getQuestion(id);
    await question.addCategories(categories);
    return res.status(StatusCodes.OK).json({ ...question.dataValues, Categories: categories });
}

const getQuestionCategories = async (req, res) => {
    const { id } = req.params;
    const categories = await questionService.getCategories(id);
    return res.status(StatusCodes.OK).json(categories);
}

const getQuestions = async (req, res) => {
    const questions = await questionService.getQuestions(req.query);
    return res.status(StatusCodes.OK).json(questions);
}

const getQuestion = async (req, res) => {
    const { id } = req.params;
    const question = await questionService.getQuestion(id);
    return res.status(StatusCodes.OK).json(question);
}

const getQuestionComments = async (req, res) => {
    const { id } = req.params;
    const include = [{ model: Comment, include: [Comment, Vote]}, Member];
    const order = [[Comment, 'voteCount' , 'DESC']];
    const question = await questionService.getQuestion(id, { include, order });
    return res.status(StatusCodes.OK).json(question);
}

const getQuestionVotes = async (req, res) => {
    const { id } = req.params;
    const votes = await voteService.getVotes({ questionId: id });
    return res.status(StatusCodes.OK).json(votes);
}

const createQuestionVote = async (req, res) => {
    const { id } = req.params;
    const { memberId, voteType } = req.body;
    const vote = await voteService.createVote({ questionId: id, memberId, voteType });
    return res.status(StatusCodes.CREATED).json(vote);
}

const deleteQuestionVote = async (req, res) => {
    const { id, voteId } = req.params;
    await voteService.deleteVote({ questionId: id, id: voteId });    
    return res.status(StatusCodes.OK).send();
}

const updateQuestionVote = async (req, res) => {
    const { id, voteId } = req.params;
    const vote = await voteService.updateVote({ questionId: id, id: voteId }, req.body);
    if (!vote) return res.status(StatusCodes.BAD_REQUEST).send();
    return res.status(StatusCodes.OK).json(vote);
}

module.exports = {
    createQuestionCategories,
    getQuestionCategories,
    getQuestions,
    getQuestion,
    getQuestionComments,
    getQuestionVotes,
    createQuestionVote,
    deleteQuestionVote,
    updateQuestionVote,
    countQuestions,
}
