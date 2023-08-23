const express = require('express');
var bodyParser = require('body-parser');
const dashboardUserRoutes = express.Router();
const {
    provideUserInfo
} = require('../controller/dashboardUserController.js');

var jsonParser = bodyParser.json();
dashboardUserRoutes.post('/getUserData', jsonParser, provideUserInfo);

module.exports = dashboardUserRoutes;