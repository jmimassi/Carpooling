const Sequelize = require('sequelize')
const db = require('../db.js')

const Itinaries = db.define('itinaries', {
    itinaries_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    startAddress: { type: Sequelize.STRING, allowNull: false },
    seats: { type: Sequelize.INTEGER, allowNull: false },
    destination: { type: Sequelize.STRING, allowNull: false },
    startDate: { type: Sequelize.STRING, allowNull: false },
    hours: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Itinaries