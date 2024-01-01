const sequelize = require('../database/connect');
const { DataTypes, Model } = require('sequelize');

class Member extends Model { }

Member.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/non-avatar.jpg",
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'id'
        }
    },
}, {
    paranoid: true,
    sequelize, // We need to pass the connection instance
    modelName: 'Member' // We need to choose the model name
});

module.exports = Member;
