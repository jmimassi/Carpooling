const Sequelize = require('sequelize')
const db = require('../db.js')

const Itinaries = db.define('itinaries', {
    itinaries_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fk_destination_id: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATE, allowNull: false}
})

module.exports = Itinaries