const { Vote, Member } = require("../models");
const Comment = require("../models/Comment")

const getComments = (conditions) => {
    let limit, offset;
    const { page, size, search, ...restOfConditions } = conditions;
    const where = [ restOfConditions ];
    
    if (page && size) {
        limit = parseInt(size);
        offset = (page * size) - size;
    }
    return Comment.findAll({ where, 
        attributes: ['id', 'content', 'voteCount'],
        limit,
        offset,
        include: [{
            model: Vote,
            attributes: ['id', 'voteType', 'memberId'],
        }, {
            model: Member,
            attributes: ['id', 'name', 'avatar']
        }]
    })
}

const createComment = (attrs) => {
    let { commentId } = attrs;
    commentId ||= 1;
    return Comment.create({ commentId, ...attrs });
}

const countComment = (conditions) => {
    return Comment.count({ where: conditions });
}

module.exports = {
    getComments,
    createComment,
    countComment,
}