let express = require('express');
const jwt = require("jsonwebtoken")
let router = express.Router();
let userController = require('./controllers/userController');
let itinarieController = require('./controllers/itinarieController');
let itinarie_userController = require('./controllers/itinarie_userController');
const cookieParser = require('cookie-parser')

function isAuthorized(req, res, next) {
    console.log(req.headers.authorization)
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "my_secret_key", (err, payload) => {
            if (err) {
                res.status(401).json({ error: "Not Authorized" });
            } else {
                req.user = payload;
                return next();
            }
        })
    }
    else {
        res.status(403).json({ error: "Nothing sent" });
    }
}

// User
router.post('/user/register', userController.userCreate);
router.get('/users', userController.userList);
router.post('/user/login', userController.userLogin)

// Itinaries
router.get('/itinaries', isAuthorized, itinarieController.itinariesList);
router.post('/itinaries', isAuthorized, itinarieController.itinarieCreate);
router.get('/itinaries/startAddress/:startAddress', isAuthorized, itinarieController.itinariesBystartAddress)
router.get('/itinaries/destination/:destination', isAuthorized, itinarieController.itinariesByDestination)
router.get('/itinariesCard/', isAuthorized, itinarieController.itinariesCardList)
router.get('/itinariesMyCard/', isAuthorized, itinarieController.itinariesMyCardList)
router.get('/itinaries/PassengerList/:itinaries_id', isAuthorized, itinarieController.itinariesPassengersList)
router.get('/itinaries/email/:email', isAuthorized, itinarieController.itinariesByEmail)
router.put('/itinarie/:itinaries_id', isAuthorized, itinarieController.itinariesUpdate)
router.patch('/itinarie/:itinaries_id/seatsmin', isAuthorized, itinarieController.itinaries_userDecrementSeat)
router.patch('/itinarie/:itinaries_id/seatsplus', isAuthorized, itinarieController.itinaries_userIncrementSeat)
router.delete('/itinarie/:itinaries_id', isAuthorized, itinarieController.itinariesDelete)

// ItinariesUser
router.post('/bookings', isAuthorized, itinarie_userController.itinarie_userCreate);
router.get('/bookings', isAuthorized, itinarie_userController.itinaries_userList);
router.get('/bookings/:fk_user', isAuthorized, itinarie_userController.itinarie_userByUserConnected)
router.get('/booking/:itinaries_user_id', isAuthorized, itinarie_userController.itinarie_userById)
router.delete('/booking/user/:fk_user/itinarie/:fk_itinaries', isAuthorized, itinarie_userController.itinaries_userDelete)
router.patch('/booking/:itinaries_user_id/accept', isAuthorized, itinarie_userController.itinaries_userAcceptPassenger)
router.patch('/booking/:itinaries_user_id/deny', isAuthorized, itinarie_userController.itinaries_userRefusedPassenger)

module.exports = router;