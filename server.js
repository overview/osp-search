

var express = require('express');


var app = express()

// Configure Express.
require('./app/config/express')(app);

// Register routes.
require('./app/config/routes')(app);

module.exports = app
