var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

const userController = require('../controllers/userController');
const middleware = require('../middleware/auth');


/* GET users listing. */
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/private', middleware, userController.private);

module.exports = router;
