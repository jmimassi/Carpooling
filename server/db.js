require('dotenv').config()

Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'carpooling',
    'root',
    '', {
    dialect: 'mysql',
    host: 'localhost',
    port:"3307"
    }
);

module.exports = sequelize