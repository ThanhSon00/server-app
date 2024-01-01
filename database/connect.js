const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize(process.env.MYSQL_URI, { dialect: 'mysql' });

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


module.exports = sequelize;