const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Destination = require('./destinationModel');
db.Itinaries_User = require('./itinaries_userModel');
db.Itinaries = require('./itinariesModel');
db.User = require('./userModel');

db.User.hasMany(db.Itinaries_User, { foreignKey: "fk_user" });
db.Itinaries_User.belongsTo(db.User, { foreignKey: "fk_user" });
db.Itinaries.hasMany(db.Itinaries_User, { foreignKey: "fk_itinaries" });
db.Itinaries_User.belongsTo(db.Itinaries, { foreignKey: "fk_itinaries" });
db.Destination.hasMany(db.Itinaries, { foreignKey: "fk_destination" });
db.Itinaries.belongsTo(db.Destination, { foreignKey: "fk_destination" });


module.exports = db