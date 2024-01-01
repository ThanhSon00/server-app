const sequelize = require('../database/connect');
const { DataTypes, Model, Op } = require('sequelize');
const { ne: notEqual } = Op;
const Member = require('./Member');
const Comment = require('./Comment');

class Question extends Model { }

Question.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  voteCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  memberId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Members",
      key: "id",
    }
  },
}, {
  paranoid: true,
  sequelize, // We need to pass the connection instance
  modelName: 'Question' // We need to choose the model name
});

Question.beforeFind((options) => {
  if (options.where instanceof Object) {
    const object = options.where;
    options.where = [];
    options.where.push(object);
  }
  options.where ||= [];
  options.where.push({ id: { [notEqual]: 1 }});
})

module.exports = Question;

