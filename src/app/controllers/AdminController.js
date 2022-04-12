const Product = require('../models/Product');
const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /admin
const showAdmin = async(req, res, next) => {
    User.findOne({ role: 'admin' }).then((user) => {
        res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
    })
}

module.exports = { showAdmin}