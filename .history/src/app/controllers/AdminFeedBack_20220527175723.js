const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /adminFeedback
const showListFB = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    
    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', orderSuccess: orderSuccess, orderFail: orderFail, user: mongooseToObject(user), product: mongooseToObject(product), order: multipleToObject(order), order2: mongooseToObject(order2) });
}
module.exports = { showListFB }