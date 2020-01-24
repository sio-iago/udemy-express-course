var express = require('express');
var path = require('path');

var app = express();

// view engine setup
require('./config/view-config')(app, path.join(__dirname, 'views'), 'jade');

// Middlewares setup
require('./config/middleware-config')(app);

// Routing setup
const routesDir = path.join(__dirname, 'routes');
require('./config/routing-config')(app, routesDir);

// Error handling setup
require('./config/error-handling-config')(app);

module.exports = app;
