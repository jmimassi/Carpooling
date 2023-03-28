const db = require('../models/index');
const User = db.User;
const Itinaries_User =  db.Itinaries_User;
const Itinaries = db.Itinaries;
const Destination = db.Destination;

exports.userList = async function (req, res) {
  await User.findAll()
      .then(data => {
          console.log("All users:", JSON.stringify(data, null, 2));
          res.json(data);
      })
      .catch(err => {
          res.status(500).json({ message: err.message })
      })
}