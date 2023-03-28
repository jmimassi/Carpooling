const Sequelize = require('sequelize')
const db = require('../db.js')

const Destination = db.define('destination', {
    destination_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    address: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Destination