const db = require('../models/index'); // Import the database module
const User = db.User; // Data model for users
const Itinaries_User = db.Itinaries_User; // Data model for itineraries users
const Itinaries = db.Itinaries; // Data model for itineraries
const Destination = db.Destination; // Data model for destinations

// Get all itineraries users and return the data as a JSON response
exports.itinaries_userList = async function (req, res) {
    await Itinaries_User.findAll()
        .then(data => {
            console.log("All itineraries_user:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

// Create a new itineraries user using the data provided in the request
exports.itinarie_userCreate = async (req, res) => {
    let itinarie_user = Itinaries_User.build({
        fk_itinaries: req.body.fk_itinaries,
        fk_user: req.body.fk_user,
        type_user: req.body.type_user,
        request_user: req.body.request_user,
        message: req.body.message
    });
    await itinarie_user.save()
        .then(data => {
            console.log(itinarie_user.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

// Get a specific itineraries user based on its ID and return the corresponding data
exports.itinarie_userById = async function (req, res) {
    await Itinaries_User.findAll({ where: { itinaries_user_id: req.params.itinaries_user_id } })
        .then(data => {
            console.log(`All itineraries_user with :${req.params.itinaries_user_id} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

// Get all itineraries users associated with the connected user and return them as a JSON response
exports.itinarie_userByUserConnected = async function (req, res) {
    await Itinaries_User.findAll({ where: { fk_user: req.user.id } })
        .then(data => {
            console.log(`All itineraries_user with :${req.user.id} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

// Delete an itineraries user based on the parameters provided in the request
exports.itinaries_userDelete = async (req, res) => {
    const { fk_user, fk_itinaries } = req.params;
    if (fk_user && fk_itinaries) {
        await Itinaries_User.destroy({
            where: { fk_user, fk_itinaries },
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: 'Invalid parameters' });
    }
};

// Update the user request status for a specific itineraries user (accepts the request)
exports.itinaries_userAcceptPassenger = async (req, res) => {
    if (req.params.itinaries_user_id) {
        await Itinaries_User.update(
            {
                request_user: true
            },
            {
                where: { itinaries_user_id: req.params.itinaries_user_id }
            }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: 'Itinarie_user not found' });
    }
}

// Update the user request status for a specific itineraries user (declines the request)
exports.itinaries_userRefusedPassenger = async (req, res) => {
    if (req.params.itinaries_user_id) {
        await Itinaries_User.update(
            {
                request_user: false
            },
            {
                where: { itinaries_user_id: req.params.itinaries_user_id }
            }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: 'Itinarie_user not found' });
    }
}
