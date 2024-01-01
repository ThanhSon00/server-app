const sequelize = require('../database/connect');
const { DataTypes, Model } = require('sequelize');

class Vote extends Model { }

Vote.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    voteType: {
        type: DataTypes.ENUM,
        values: ['UP', 'DOWN'],
        allowNull: false,
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Comments',
            key: 'id',
        },
        defaultValue: 1,
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Questions',
            key: 'id',
        },
        defaultValue: 1,
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Members',
            key: 'id',
        },
        defaultValue: 1,
    },
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Vote' // We need to choose the model name
});

module.exports = Vote;
