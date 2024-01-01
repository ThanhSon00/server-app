const { StatusCodes } = require('http-status-codes');
const { categoryService } = require('../services');

const getCategories = async (req, res) => {
    const categories = await categoryService.getCategories();
    return res.status(StatusCodes.OK).json(categories);
}

const getQuestionsByCategories = async (req, res) => {
    const { ids } = req.params;
    const idArray = ids.split(',');
    const questions = await categoryService.getQuestionsByCategoryIds(idArray);
    return res.status(StatusCodes.OK).json(questions);
}

module.exports = {
    getCategories,
    getQuestionsByCategories
}