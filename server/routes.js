let express = require('express');

let router = express.Router();
let airController = require('./controllers/airController');

router.get('/reservation', airController.reservation);

module.exports = router;