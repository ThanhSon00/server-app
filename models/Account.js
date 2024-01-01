const sequelize = require('../database/connect');
const { DataTypes, Model } = require('sequelize');

class Account extends Model { }

Account.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    paranoid: true,
    sequelize, // We need to pass the connection instance
    modelName: 'Account' // We need to choose the model name
});

module.exports = Account;

