const Sequelize = require('sequelize')
const db = require('../db.js')

const Itinaries_User = db.define('itinaries_user', {
    itinaries_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // fk_itinaries: { type: Sequelize.INTEGER, allowNull: false },
    // fk_user: { type: Sequelize.STRING, allowNull: false},
    type_user: { type: Sequelize.STRING, allowNull: false },
    request_user: { type: Sequelize.BOOLEAN, allowNull: false },
    message: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Itinaries_User