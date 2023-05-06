require('dotenv').config()

Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'carpooling',
    'test',
    'test', {
    dialect: 'mysql',
    host: 'pat.infolab.ecam.be',
    //port: 3306
    port: 63346
}
);

module.exports = sequelize