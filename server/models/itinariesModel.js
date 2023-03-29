const Sequelize = require('sequelize')
const db = require('../db.js')

const Itinaries = db.define('itinaries', {
    itinaries_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // fk_destination: { type: Sequelize.STRING, allowNull: false },
    startAddress: { type: Sequelize.STRING, allowNull: false },
    seats: { type: Sequelize.INTEGER, allowNull: false }
})

module.exports = Itinaries