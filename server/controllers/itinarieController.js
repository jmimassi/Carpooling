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

exports.itinariesBystartAddress = async function (req, res) {
    await Itinaries.findAll({ where: { startAddress: req.params.startAddress } })
        .then(data => {
            console.log(`All itinaries with :${req.params.startAddress} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinariesByAddress = async function (req, res) {
    await Itinaries.findAll({ where: { address: req.params.address } })
        .then(data => {
            console.log(`All itinaries with :${req.params.address} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinariesUpdate = async (req, res) => {
    if (req.params.itinaries_id) {
        await Itinaries.update(
            {
                fk_destination: req.body.fk_destination,
                startAddress: req.body.startAddress,
                seats: req.body.seats
            }, {
            where: { itinaries_id: req.params.itinaries_id }
        }
        )
            .then(data => {
                // console.log(destination.toJSON());
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Itinarie not found' })
}


exports.itinariesDelete = async (req, res) => {
    if (req.params.itinaries_id) {
        await Itinaries.destroy(
            {
                where: { itinaries_id: req.params.itinaries_id }
            }
        )
            .then(data => {
                // console.log(destination.toJSON());
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Itinarie not found' })
}


exports.itinariesUpdateSeats = async (req, res) => {
    if (req.params.itinaries_id) {
        await Itinaries.update(
            {
                seats: req.body.seats
            }, {
            where: { itinaries_id: req.params.itinaries_id }
        }
        )
            .then(data => {
                // console.log(destination.toJSON());
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Itinarie not found' })
}

// exports.itinariesUpdateSeats = async (req, res) => {
//     const itinaries = await Itinaries.findByPk(req.params.itinaries_id);
//     if (!itinaries) {
//         return res.status(400).json({ message: 'Itinarie not found' });
//     }
//     await itinaries.update({ seats: req.body.seats }, { where: { itinaries_id: req.params.itinaries_id } });
//     res.json(itinaries);
// };