const { StatusCodes } = require("http-status-codes");
const { voteService, commentService } = require("../services")

const getCommentVotes = async (req, res) => {
    const { id: commentId } = req.params;
    const votes = await voteService.getVotes({ commentId, ...req.query });
    return res.status(StatusCodes.OK).json(votes);
}

const createCommentVotes = async (req, res) => {
    const { id: commentId } = req.params;
    const { voteType, ...conditions } = req.body;
    await voteService.deleteVote({ commentId, ...conditions });

    const vote = await voteService.createVote({ commentId, ...req.body });
    return res.status(StatusCodes.CREATED).json(vote);
}

const deleteCommentVotes = async (req, res) => {
    const { id: commentId, voteId: id } = req.params;
    await voteService.deleteVote({ id, commentId });
    return res.status(StatusCodes.OK).send();
}

const getComments = async (req, res) => {
    const comments = await commentService.getComments(req.query);
    return res.status(StatusCodes.OK).json(comments);
}

const countComments = async (req, res) => {
    const count = await commentService.countComment(req.query);
    return res.status(StatusCodes.OK).json(count);
}

module.exports = {
    countComments,
    getComments,
    getCommentVotes,
    createCommentVotes,
    deleteCommentVotes
}