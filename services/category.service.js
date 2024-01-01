const Category = require("../models/Category")
const { Op } = require("sequelize");
const Question = require("../models/Question");

const createCategories = (objArray) => {
    return Category.bulkCreate(objArray);
}

const getCategories = () => {
    return Category.findAll();
}

const getQuestionsByCategoryIds = async (categoryIds) => {
    const categoryQuestions = await Category.findAll({ where: {
        id: {
            [Op.in]: categoryIds
        }
    }, include: Question});

    const categoryQuestionsJson = JSON.parse(JSON.stringify(categoryQuestions));
    const allQuestions = categoryQuestionsJson.flatMap(category => category.Questions);
    
    if (allQuestions.length === 0) {
        return [];
    }

    const uniqueQuestionsMap = new Map();
    allQuestions.forEach(question => {
        const { Categories_Questions, ...questionWithoutCategories } = question;
        uniqueQuestionsMap.set(question.id, questionWithoutCategories);
    });

    const questions = Array.from(uniqueQuestionsMap.values());

    return questions;
}

module.exports = {
    getCategories,
    getQuestionsByCategoryIds,
    createCategories,
}