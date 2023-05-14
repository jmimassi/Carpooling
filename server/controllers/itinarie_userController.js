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

exports.itinarie_userById = async function (req, res) {
    await Itinaries_User.findAll({ where: { itinaries_user_id: req.params.itinaries_user_id } })
        .then(data => {
            console.log(`All itinaries_user with :${req.params.itinaries_user_id} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinarie_userByUserConnected = async function (req, res) {
    await Itinaries_User.findAll({ where: { fk_user: req.user.id } })
        .then(data => {
            console.log(`All itinaries_user with :${req.user.id} in params`, JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.itinaries_userDelete = async (req, res) => {
    if (req.params.itinaries_user_id) {
        await Itinaries_User.destroy(
            {
                where: { itinaries_user_id: req.params.itinaries_user_id }
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
    else res.status(400).json({ message: 'Itinarie_user not found' })
}

exports.itinaries_userAcceptPassenger = async (req, res) => {
    // console.log(req.params.itinaries_user_id)
    if (req.params.itinaries_user_id) {
        await Itinaries_User.update(
            {
                request_user: true
            }, {
            where: { itinaries_user_id: req.params.itinaries_user_id }
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
    else res.status(400).json({ message: 'Itinarie_user not found' })
}

exports.itinaries_userRefusedPassenger = async (req, res) => {
    // console.log(req.params.itinaries_user_id)
    if (req.params.itinaries_user_id) {
        await Itinaries_User.update(
            {
                request_user: false
            }, {
            where: { itinaries_user_id: req.params.itinaries_user_id }
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
    else res.status(400).json({ message: 'Itinarie_user not found' })
}
