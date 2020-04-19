require('dotenv').config()

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;