const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')

//[GET] /
const showIndex = async(req, res, next) => {
    // const userInfo = await User.findById(req.user._id);
    res.render('TabHome/home', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: req.user });
}

module.exports = { showIndex }