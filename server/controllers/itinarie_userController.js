const db = require('../models/index');
const User = db.User;
const Itinaries_User = db.Itinaries_User;
const Itinaries = db.Itinaries;
const Destination = db.Destination;


exports.itinaries_userList = async function (req, res) {
    await Itinaries_User.findAll()
        .then(data => {
            console.log("All itinaries_user:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinarie_userCreate = async (req, res) => {
    let itinarie_user = Itinaries_User.build({
        fk_itinaries: req.body.fk_itinaries,
        fk_user: req.body.fk_user,
        type_user: req.body.type_user,
        request_user: req.body.request_user,
        message: req.body.message
    })
    await itinarie_user.save()
        .then(data => {
            console.log(itinarie_user.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinaries_userById = async function (req, res) {
    await Itinaries_User.findAll()
        .then(data => {
            console.log("All itinaries_user:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}