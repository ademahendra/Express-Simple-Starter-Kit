'use strict';

var express = require('express'),
    Users = require('./Users.js'),
    restRoutes = express.Router()
    
restRoutes.use('/', Users)

module.exports = restRoutes;
