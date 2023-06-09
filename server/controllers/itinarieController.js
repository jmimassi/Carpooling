const db = require('../models/index');
const User = db.User;
const Itinaries_User = db.Itinaries_User;
const Itinaries = db.Itinaries;
const Destination = db.Destination;

// Get all itineraries and their associated users
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
            // Process and format the data if needed
            listformatted.push();
            console.log("All itineraries:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

// Get all itineraries with formatted data for displaying as cards
exports.itinariesCardList = async function (req, res) {
    let listformatted = [];
    console.log('');
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
                // Extract relevant information from the itinerary and format it as needed
                let conductorEmail = '';
                let passengerEmails = [];
                let licensePlate = '';
                itinerary.itinaries_users.forEach((user) => {
                    licensePlate = user.user.lisence_plate; // Add license plate to the itinerary
                    if (user.type_user === 'conductor') {
                        conductorEmail = user.user.email;
                    } else if (user.type_user === 'passenger') {
                        passengerEmails.push(user.user.email);
                    }
                });
                console.log(req.user.id);
                console.log(conductorEmail);
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
                    licensePlate: licensePlate, // Add license plate to the itinerary object
                };

                listformatted.push(itineraryObj);
            });

            console.log('All itineraries:', JSON.stringify(listformatted, null, 2));
            res.json(listformatted);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

// Get the formatted list of itineraries for the current user (conductor or passenger)
exports.itinariesMyCardList = async function (req, res) {
    let listformatted = [];

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
                // Extract relevant information from the itinerary and format it as needed
                let conductorEmail = '';
                let passengerRequest = {};
                let licensePlate = '';

                itinerary.itinaries_users.forEach((user) => {
                    licensePlate = user.user.lisence_plate;
                    if (user.type_user === 'conductor') {
                        conductorEmail = user.user.email;
                    } else if (user.type_user === 'passenger') {
                        passengerRequest[user.fk_user] = user.request_user; // Add fk_user as key and request_user as value to the dictionary
                    }
                });

                // Check if the user is either the conductor or a passenger
                if (conductorEmail == req.user.id || Object.keys(passengerRequest).includes(req.user.id)) {
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
                        passengerRequest: passengerRequest,
                        licensePlate: licensePlate
                    };

                    listformatted.push(itineraryObj);
                }
            });

            console.log('All itineraries:', JSON.stringify(listformatted, null, 2));
            res.json(listformatted);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

// Get the list of passengers for a specific itinerary
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

// Create a new itinerary
exports.itinarieCreate = async (req, res) => {
    let itinarie = Itinaries.build({
        destination: req.body.destination,
        startAddress: req.body.startAddress,
        seats: req.body.seats,
        startDate: req.body.startDate,
        hours: req.body.hours,
    });
    await itinarie.save()
        .then(data => {
            console.log(itinarie.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Get itineraries by start address
exports.itinariesBystartAddress = async function (req, res) {
    await Itinaries.findAll({ where: { startAddress: req.params.startAddress } })
        .then(data => {
            console.log(`All itineraries with :${req.params.startAddress} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Get itineraries by email
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
            console.log(`All itineraries with :${req.params.email} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Get itineraries by destination
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
            console.log(`All itineraries with :${req.params.destination} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Update an itinerary
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
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: 'Itinarie not found' });
    }
};

// Delete an itinerary
exports.itinariesDelete = async (req, res) => {
    if (req.params.itinaries_id) {
        await Itinaries.destroy(
            {
                where: { itinaries_id: req.params.itinaries_id }
            }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: 'Itinarie not found' });
    }
};

// Decrement the number of available seats for an itinerary
exports.itinaries_userDecrementSeat = async (req, res) => {
    console.log(req.params.itinaries_id);
    if (req.params.itinaries_id) {
        try {
            // Find the itinerary with the given ID
            const itinerary = await Itinaries.findOne({ where: { itinaries_id: req.params.itinaries_id } });

            if (!itinerary) {
                return res.status(404).json({ message: 'Itinarie not found' });
            }

            // Decrease the seats value by one
            itinerary.seats -= 1;

            // Save the itinerary with the new seats value
            const updatedItinerary = await itinerary.save();

            // Respond with the updated itinerary
            res.json(updatedItinerary);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid Itinarie ID' });
    }
};

// Increment the number of available seats for an itinerary
exports.itinaries_userIncrementSeat = async (req, res) => {
    console.log(req.params.itinaries_id);
    if (req.params.itinaries_id) {
        try {
            // Find the itinerary with the given ID
            const itinerary = await Itinaries.findOne({ where: { itinaries_id: req.params.itinaries_id } });

            if (!itinerary) {
                return res.status(404).json({ message: 'Itinarie not found' });
            }

            // Increase the seats value by one
            itinerary.seats += 1;

            // Save the itinerary with the new seats value
            const updatedItinerary = await itinerary.save();

            // Respond with the updated itinerary
            res.json(updatedItinerary);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid Itinarie ID' });
    }
};
