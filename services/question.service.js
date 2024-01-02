const { Sequelize, Op }  = require('sequelize');
const { Category, Member } = require("../models");
const { Question, Comment } = require("../models")
const { ne: notEqual, eq: Equal } = Op;


const getCategories = async (id) => {
    const question = await Question.findByPk(id, { include: Category });
    const questionJson = JSON.parse(JSON.stringify(question));
    const categories = questionJson.Categories.map(({ Categories_Questions, ...rest }) => rest);
    return categories;
}

const getQuestions = (conditions) => {
    let limit, offset;
    const { page, size, search, filter, ...restOfConditions } = conditions;
    const where = [ restOfConditions ], order = [['createdAt', 'DESC']], having = [], attributes = { include: [] };

    attributes.include.push([Sequelize.literal('(SELECT COUNT(*) FROM `Comments` WHERE `Comments`.questionId = `Question`.`id`)'), 'commentsCount']);

    if (search) {
        having.push({ searchScore: { [notEqual]: 0 }});
        order.push(['searchScore', 'DESC']);
        attributes.include.push([Sequelize.literal('MATCH (title, content) AGAINST (:search)'), 'searchScore']);
    }
    if (page && size) {
        limit = parseInt(size);
        offset = (page * size) - size;
    } 

    if (filter === 'unanswered') having.push({ 'commentsCount': { [Equal]: 0 } });
    if (filter === 'answered') having.push({ 'commentsCount': { [notEqual]: 0 } });

    return Question.findAll({ where, 
        attributes,
        include: [ Member ],
        replacements: { search },
        order,
        limit,
        offset,
        having,
    })
}

const getQuestion = (id, options) => {
    return Question.findByPk(id, options);
}

const createQuestion = (attrs) => {
    return Question.create(attrs);
}

const countQuestions = (conditions) => {    
    let having = [];
    const { search, filter, ...restOfConditions } = conditions;
    const where = [ restOfConditions ];
    where.push([])
    if (filter === 'unanswered') having.push({ 'commentsCount': { [Equal]: 0 } });
    if (filter === 'answered') having.push({ 'commentsCount': { [notEqual]: 0 } })

    return Question.count({ where, 
        attributes: { include: [ 
            [Sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.questionId = `Question`.`id`)'), 'commentsCount'],
            [Sequelize.literal('MATCH (title, content) AGAINST (:search)'), 'searchScore'],
        ]},
        replacements: { search },
        group: ['id'],
        having,
    }); 
}

module.exports = {
    getCategories,
    getQuestions,
    getQuestion,
    createQuestion,
    countQuestions
}