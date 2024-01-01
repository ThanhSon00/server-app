const sequelize = require('../database/connect');
const { DataTypes, Model, Op } = require('sequelize');
const { ne: notEqual } = Op;

class Comment extends Model { }

Comment.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Members',
            key: 'id',
        }
    },
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Questions',
            key: 'id',
        }
    },
    commentId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Comments',
            key: 'id',
        }
    },
}, {
    paranoid: true,
    sequelize, // We need to pass the connection instance
    modelName: 'Comment' // We need to choose the model name
});


Comment.beforeFind((options) => {
    options.where ||= [];
    options.where.push({ id: { [notEqual]: 1 }});
  })

module.exports = Comment;
