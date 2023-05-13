const db = require('../models/index');
const User = db.User;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

exports.userList = async function (req, res) {
    console.log('req.user :', req.user)
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
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)

    let user = User.build({
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        // number_passengers_max: req.body.number_passengers_max,
        lisence_plate: req.body.lisence_plate,
        picture: req.body.picture
    })
    // res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
    await user.save()

        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

}


exports.userLogin = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) {
        console.log('user not found')
        return res.status(404).send({
            message: 'user not found'
        })
    }

    // if (!await bcrypt.compare(req.body.password, user.password)) {
    //     console.log('user')
    //     return res.status(400).send({
    //         message: 'invalid credentials'
    //     })
    // }
    if (req.body.password !== user.password) {
        console.log('user')
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    const jwtKey = "my_secret_key"
    const jwtExpirySeconds = 300
    let payload = { id: user.email };
    let token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: Number.MAX_SAFE_INTEGER,
    })
    console.log("c'est le login qui a été push", payload)
    // res.cookie("token", token, { httpOnly: true, secure: true, maxAge: jwtExpirySeconds * 1000 });
    console.log(token)
    res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
}

// exports.userLogout = async (req, res) => {
//     localStorage.removeItem("token");
//     res.send({
//         message: 'succes'
//     })
// }