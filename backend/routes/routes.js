const express = require('express');
const router = express.Router();
const app = express();
const routes = require('./createUserRoute.js')

const { 
    checkApi
} = require('../controller/createUserController.js')

router.get('/', checkApi);
app.use('/signIn', routes);


module.exports = router;