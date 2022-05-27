const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /adminFeedback
const showListFB = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    
    res.render('TabFeedback/admin-feedback-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
}
module.exports = { showListFB }