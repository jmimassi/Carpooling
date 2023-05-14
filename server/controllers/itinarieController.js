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
                console.log(req.user.id)
                console.log(conductorEmail)
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
                console.log(req.user.id)
                console.log(conductorEmail)
                if (conductorEmail == req.user.id || passengerEmails.includes(req.user.id)) {
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
                }
            });

            console.log('All itinaries:', JSON.stringify(listformatted, null, 2));
            res.json(listformatted);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

exports.itinariesPassengersList = async function (req, res) {
    if (!req.params.itinaries_id) {
        return res.status(400).json({ message: 'Missing itinerary ID' });
    }

    try {
        const itinerary = await Itinaries.findByPk(req.params.itinaries_id, {
            include: [{
                model: Itinaries_User,
                where: { type_user: 'passenger' },
                include: [User]
            }]
        });

        console.log('All passengers:', JSON.stringify(itinerary, null, 2));
        res.json(itinerary);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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

// itinaries_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
// },
// // fk_destination: { type: Sequelize.STRING, allowNull: false },
// startAddress: { type: Sequelize.STRING, allowNull: false },
// seats: { type: Sequelize.INTEGER, allowNull: false },
// destination: { type: Sequelize.STRING, allowNull: false },
// startDate: { type: Sequelize.STRING, allowNull: false },
// hours: { type: Sequelize.STRING, allowNull: false }

exports.itinariesUpdate = async (req, res) => {
    if (req.params.itinaries_id) {
        await Itinaries.update(
            {
                destination: req.body.destination,
                startAddress: req.body.startAddress,
                seats: req.body.seats,
                hours: req.body.hours,
                startDate: req.body.startDate
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


exports.itinaries_userDecrementSeat = async (req, res) => {
    console.log(req.params.itinaries_id)
    if (req.params.itinaries_id) {
        try {
            // Find the Itinarie_User with the given ID
            const itinarie = await Itinaries.findOne({ where: { itinaries_id: req.params.itinaries_id } });

            if (!itinarie) {
                return res.status(404).json({ message: 'Itinarie not found' });
            }

            // Decrease the seats value by one
            itinarie.seats -= 1;

            // Save the Itinarie_User with the new seats value
            const updatedItinarie = await itinarie.save();

            // Respond with the updated Itinarie_User
            res.json(updatedItinarie);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid Itinarie ID' });
    }
}

exports.itinaries_userIncrementSeat = async (req, res) => {
    console.log(req.params.itinaries_id)
    if (req.params.itinaries_id) {
        try {
            // Find the Itinarie_User with the given ID
            const itinarie = await Itinaries.findOne({ where: { itinaries_id: req.params.itinaries_id } });

            if (!itinarie) {
                return res.status(404).json({ message: 'Itinarie not found' });
            }

            // Decrease the seats value by one
            itinarie.seats += 1;

            // Save the Itinarie_User with the new seats value
            const updatedItinarie = await itinarie.save();

            // Respond with the updated Itinarie_User
            res.json(updatedItinarie);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid Itinarie ID' });
    }
}
// exports.itinariesUpdateSeats = async (req, res) => {
//     const itinaries = await Itinaries.findByPk(req.params.itinaries_id);
//     if (!itinaries) {
//         return res.status(400).json({ message: 'Itinarie not found' });
//     }
//     await itinaries.update({ seats: req.body.seats }, { where: { itinaries_id: req.params.itinaries_id } });
//     res.json(itinaries);
// };