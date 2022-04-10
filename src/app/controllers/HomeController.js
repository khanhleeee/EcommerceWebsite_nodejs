const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')

//[GET] /
const showIndex = async(req, res, next) => {
    const user = await User.findById(req.params.id);
    res.render('TabHome/home', { layout: 'mainClient.hbs', user: mongooseToObject(req.user) });
}

module.exports = { showIndex }