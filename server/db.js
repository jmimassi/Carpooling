require('dotenv').config()

Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'carpooling',
    'root',
    'root', {
    dialect: 'mysql',
    // host: 'pat.infolab.ecam.be',
    host: 'localhost',
    port: 3307
    // port: 63346
}
);

module.exports = sequelize