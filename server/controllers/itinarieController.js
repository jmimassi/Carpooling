const db = require('../models/index');
const User = db.User;
const Itinaries_User = db.Itinaries_User;
const Itinaries = db.Itinaries;
const Destination = db.Destination;


exports.itinariesList = async function (req, res) {
    let listformatted = [];
    await Itinaries.findAll({
        include: [{
            model: Itinaries_User,
            include: [{
                model: User
            }]
        }]
    })
        .then(data => {
            listformatted.push()
            console.log("All itinaries:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


exports.itinariesCardList = async function (req, res) {
    let listformatted = [];
    console.log('')
    await Itinaries.findAll({
        include: [
            {
                model: Itinaries_User,
                include: [
                    {
                        model: User,
                    },
                ],
            },
        ],
    })
        .then((data) => {
            data.forEach((itinerary) => {
                let conductorEmail = '';
                let passengerEmails = [];

                itinerary.itinaries_users.forEach((user) => {
                    if (user.type_user === 'conductor') {
                        conductorEmail = user.user.email;
                    } else if (user.type_user === 'passenger') {
                        passengerEmails.push(user.user.email);
                    }
                });
                let itineraryObj = {
                    itinaries_id: itinerary.itinaries_id,
                    startAddress: itinerary.startAddress,
                    seats: itinerary.seats,
                    destination: itinerary.destination,
                    createdAt: itinerary.createdAt,
                    updatedAt: itinerary.updatedAt,
                    startDate: itinerary.startDate,
                    hours: itinerary.hours,
                    conductorEmail: conductorEmail,
                    passengerEmails: passengerEmails,
                };

                listformatted.push(itineraryObj);
            });

            console.log('All itinaries:', JSON.stringify(listformatted, null, 2));
            res.json(listformatted);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

exports.itinariesMyCardList = async function (req, res) {
    let listformatted = [];
    await Itinaries_User.findAll({
        where: { fk_user: req.user },
        include: [
            {
                model: Itinaries,
                include: [
                    {
                        model: Itinaries_User,
                        include: [
                            {
                                model: User,
                            },
                        ],
                    },
                ],
            },
        ],
    })
        .then((data) => {
            data.forEach((itineraryUser) => {
                const itinerary = itineraryUser.itinary;
                let conductorEmail = '';
                let passengerEmails = [];

                itinerary.itinaries_users.forEach((user) => {
                    if (user.type_user === 'conductor') {
                        conductorEmail = user.user.email;
                    } else if (user.type_user === 'passenger') {
                        passengerEmails.push(user.user.email);
                    }
                });
                let itineraryObj = {
                    itinaries_id: itinerary.itinaries_id,
                    startAddress: itinerary.startAddress,
                    seats: itinerary.seats,
                    destination: itinerary.destination,
                    createdAt: itinerary.createdAt,
                    updatedAt: itinerary.updatedAt,
                    startDate: itinerary.startDate,
                    hours: itinerary.hours,
                    conductorEmail: conductorEmail,
                    passengerEmails: passengerEmails,
                };

                listformatted.push(itineraryObj);
            });

            console.log('My itinaries:', JSON.stringify(listformatted, null, 2));
            res.json(listformatted);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};



exports.itinarieCreate = async (req, res) => {
    let itinarie = Itinaries.build({
        destination: req.body.destination,
        startAddress: req.body.startAddress,
        seats: req.body.seats,
        startDate: req.body.startDate,
        hours: req.body.hours,
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

exports.itinariesByEmail = async function (req, res) {
    await Itinaries.findAll({
        include: [{
            model: Itinaries_User,
            include: [{
                model: User,
                attribute: ['email'],
                where: { email: req.params.email }
            }]
        }]
    })
        .then(data => {
            console.log(data);
            console.log(`All itinaries with :${req.params.email} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinariesByDestination = async function (req, res) {
    await Itinaries.findAll({
        include: [{
            model: Itinaries_User,
            include: [{
                model: User,
                attribute: ['email'],
                where: { email: req.params.email }
            }]
        }]
    })
        .then(data => {
            console.log(`All itinaries with :${req.params.destination} in params`, JSON.stringify(data, null, 2));
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