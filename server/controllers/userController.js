const { where } = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Itinaries_User = db.Itinaries_User;
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

exports.userCreate = async (req, res) => {
    let user = User.build({
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        number_passengers_max: req.body.number_passengers_max,
        lisence_plate: req.body.lisence_plate,
        picture: req.body.picture
    })
    await user.save()
        .then(data => {
            console.log(user.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}