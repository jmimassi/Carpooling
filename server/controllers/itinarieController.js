const db = require('../models/index');
const User = db.User;
const Itinaries_User = db.Itinaries_User;
const Itinaries = db.Itinaries;
const Destination = db.Destination;


exports.itinariesList = async function (req, res) {
    await Itinaries.findAll()
        .then(data => {
            console.log("All itinaries:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinarieCreate = async (req, res) => {
    let itinarie = Itinaries.build({
        fk_destination: req.body.fk_destination,
        startAddress: req.body.startAddress,
        seats: req.body.seats
    })
    await itinarie.save()
        .then(data => {
            console.log(itinarie.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinariesstartAddressList = async function (req, res) {
    await Itinaries.findAll({ where: { startAddress: req.params.startAddress } })
        .then(data => {
            console.log(`All itinaries with :${req.params.startAddress} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}
