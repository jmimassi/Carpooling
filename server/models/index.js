const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Destination = require('./destinationModel');
db.Itinaries_User = require('./itinaries_userModel');
db.Itinaries = require('./itinariesModel');
db.User = require('./userModel');

db.User.belongsTo( db.Itinaries_User, {foreignKey: "fk_user"} );
db.Itinaries_User.hasMany(db.User, { foreignKey: "fk_user" });

module.exports = db