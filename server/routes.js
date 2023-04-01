let express = require('express');

let router = express.Router();
let userController = require('./controllers/userController');
let itinarieController = require('./controllers/itinarieController');
let itinarie_userController = require('./controllers/itinarie_userController');
let destinationController = require('./controllers/destinationController');

// User
router.post('/user/register', userController.userCreate);

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
router.get('/booking/:itinaries_user_id', itinarie_userController.itinarie_userById)
router.delete('/booking/:itinaries_user_id', itinarie_userController.itinaries_userDelete)
router.patch('/booking/:itinaries_user_id/accept', itinarie_userController.itinaries_userAcceptPassenger)
router.patch('/booking/:itinaries_user_id/deny', itinarie_userController.itinaries_userRefusedPassenger)

// Destination
router.get('/destinations', destinationController.destinationList);
router.post('/destinations', destinationController.destinationCreate);

module.exports = router;