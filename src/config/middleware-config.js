const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const middlewareConfig = app => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // Session management middleware
    const FileStore = require('../session/file-store')(session);

    app.use(session({
        store: new FileStore(),
        name: 'basic-express-app',
        secret: process.env.APP_SECRET || 'not-safe-dev-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            // Make sure our users are logged in for a full day
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));

    // Our custom middlewares here
    const userManagement = require('../middlewares/user-management');
    app.use(userManagement);

    const routeGuard = require('../middlewares/route-guard');
    app.use(routeGuard(path.join(__dirname, 'security', 'routes.json')));
};

module.exports = middlewareConfig;