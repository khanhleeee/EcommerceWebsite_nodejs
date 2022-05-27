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
    let productName = [];
    for (let i of allCmt) {
        var p_id = i.productId.toString();
        const prod = await Product.findById(p_id)
        console.log(prod)
    }
    const findProduct = await Product.findById(allCmt.productId);
    res.render('TabFeedback/admin-feedback-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), allCmt: multipleToObject(allCmt) });
}
module.exports = { showListFB }