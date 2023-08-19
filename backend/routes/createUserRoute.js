const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const { 
    signInOwner,
    createUser,
    signInUser
} = require('../controller/createUserController.js')

var jsonParser = bodyParser.json()


router.post('/', jsonParser, signInUser);
router.get('/createUser', signInOwner);
router.post('/createUser', jsonParser, createUser);

module.exports = router;