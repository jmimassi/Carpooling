const Sequelize = require('sequelize')
const db = require('../db.js')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: true },
    lisence_plate: { type: Sequelize.STRING, allowNull: true },
    picture: { type: Sequelize.STRING, allowNull: true },
})

module.exports = User