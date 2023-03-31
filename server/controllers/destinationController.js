const db = require('../models/index');
const User = db.User;
const Itinaries_User = db.Itinaries_User;
const Itinaries = db.Itinaries;
const Destination = db.Destination;


exports.destinationList = async function (req, res) {
    await Destination.findAll()
        .then(data => {
            console.log("All destinations:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.destinationCreate = async (req, res) => {
    let destination = Destination.build({
        address: req.body.address,
    })
    await destination.save()
        .then(data => {
            console.log(destination.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}