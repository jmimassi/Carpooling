// let Reservation = require('../models/reservationModel');
// let Voyageur = require('../models/voyageurModel');
// const connection = require('../database/database');
// const session = require('express-session');

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

exports.reservation = function (req, res) {
  let message = "hello guys"
  res.json({"message": message});
}