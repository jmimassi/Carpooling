let express = require('express');

let router = express.Router();
let userController = require('./controllers/userController');
let itinarieController = require('./controllers/itinarieController');
let itinarie_userController = require('./controllers/itinarie_userController');
let destinationController = require('./controllers/destinationController');

// User
router.post('/user/register', userController.userCreate);

// Itinaries
router.get('/routes', itinarieController.itinariesList);
router.post('/routes', itinarieController.itinarieCreate);
router.get('/routes/:startAddress', itinarieController.itinariesstartAddressList)

// ItinariesUser
router.get('/bookings', itinarie_userController.itinaries_userList);
router.post('/bookings', itinarie_userController.itinarie_userCreate);

// Destination
router.get('/destinations', destinationController.destinationList);
router.post('/destinations', destinationController.destinationCreate);

module.exports = router;