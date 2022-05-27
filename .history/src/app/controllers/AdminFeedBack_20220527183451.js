const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const Comment = require('../models/Comment');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /adminFeedback
const showListFB = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const allCmt = await Comment.find();
    for (let i of allCmt) {
        console.log(i)
    }
    const findProduct = await Product.findById(allCmt.productId);
    console.log(findProduct)
    res.render('TabFeedback/admin-feedback-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), allCmt: multipleToObject(allCmt) });
}
module.exports = { showListFB }