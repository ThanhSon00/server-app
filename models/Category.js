const sequelize = require('../database/connect');
const { DataTypes, Model } = require('sequelize');
const Question = require('./Question');

class Category extends Model { }

Category.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
}, {
    paranoid: true,
    sequelize, // We need to pass the connection instance
    modelName: 'Category' // We need to choose the model name
});

Category.beforeSave((category) => {
  const name = category.getDataValue('name');
  category.setDataValue('name', name.toLowerCase());
})

module.exports = Category;
