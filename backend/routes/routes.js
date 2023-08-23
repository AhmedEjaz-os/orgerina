const express = require('express');
const router = express.Router();
const { 
    checkApi
} = require('../controller/createUserController.js');

router.get('/', checkApi);


module.exports = router;