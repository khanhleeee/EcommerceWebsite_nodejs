const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')

//[GET] /
const showLoginFB = async(req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render('TabHome/home', { layout: 'mainClient.hbs', user: mongooseToObject(user) });
}

module.exports = { showLoginFB }