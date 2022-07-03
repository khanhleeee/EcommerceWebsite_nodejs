const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// [GET] /logout
const showLogout = async(req, res, next) => {
    req.logout();
    // req.session.destroy();
    res.render('TabLogin/login', { layout: 'mainClient.hbs', });
}

module.exports = { showLogout }