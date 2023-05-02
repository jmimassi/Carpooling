let express = require('express');
const jwt = require("jsonwebtoken")
let router = express.Router();
let userController = require('./controllers/userController');
let itinarieController = require('./controllers/itinarieController');
let itinarie_userController = require('./controllers/itinarie_userController');
let destinationController = require('./controllers/destinationController');
const cookieParser = require('cookie-parser')

const isAuthorized = (req, res, next) => {
    console.log(req.headers)
    if (typeof req.cookies['token'] !== "undefined") {
        //     //     // retrieve the authorization header and parse out the JWT using the split function
        let token = req.cookies['token'];
        //     //     // Here we validate that the JSON Web Token is valid
        jwt.verify(token, 'my_secret_key', (err, payload) => {
            if (err) {
                res.status(401).json({ error: "Not Authorized" });
            }
            console.log(payload)
            req.user = payload; // allow to use the user id in the controller
            return next();
        });
    }
    else {
        res.send('headers is undefined')
    }

}

// User
router.post('/user/register', userController.userCreate);
router.get('/users', isAuthorized, userController.userList);
router.post('/user/login', userController.userLogin)
router.post('/user/logout', userController.userLogout)

// Itinaries
router.get('/itinaries', itinarieController.itinariesList);
router.post('/itinaries', itinarieController.itinarieCreate);
router.get('/itinaries/:startAddress', itinarieController.itinariesBystartAddress)
router.get('/itinaries/:address', itinarieController.itinariesByAddress)
router.put('/itinarie/:itinaries_id', itinarieController.itinariesUpdate)
router.patch('/itinarie/:itinaries_id/seats', itinarieController.itinariesUpdateSeats)
router.delete('/itinarie/:itinaries_id', itinarieController.itinariesDelete)

// ItinariesUser
router.post('/bookings', itinarie_userController.itinarie_userCreate);
router.get('/bookings', itinarie_userController.itinaries_userList);
router.get('/bookings/:fk_user', isAuthorized, itinarie_userController.itinarie_userByUserConnected)
router.get('/booking/:itinaries_user_id', itinarie_userController.itinarie_userById)
router.delete('/booking/:itinaries_user_id', itinarie_userController.itinaries_userDelete)
router.patch('/booking/:itinaries_user_id/accept', itinarie_userController.itinaries_userAcceptPassenger)
router.patch('/booking/:itinaries_user_id/deny', itinarie_userController.itinaries_userRefusedPassenger)

// Destination
router.get('/destinations', destinationController.destinationList);
router.post('/destinations', destinationController.destinationCreate);

module.exports = router;