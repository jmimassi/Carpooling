const Sequelize = require('sequelize')
const db = require('../db.js')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    number_passengers_max: { type: Sequelize.INTEGER, allowNull: true },
    lisence_plate: { type: Sequelize.STRING, allowNull: true },
    picture: { type: Sequelize.STRING, allowNull: false },
})

module.exports = User