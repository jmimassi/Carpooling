let express = require('express');

let router = express.Router();
let userController = require('./controllers/userController');

router.get('/users', userController.userList);
router.post('/user/register', userController.userCreate);

module.exports = router;