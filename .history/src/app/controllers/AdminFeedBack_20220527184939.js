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
    var productData = [];
    for (let i of allCmt) {
        var p_id = i.productId.toString();
        const prod = await Product.findById(p_id)
        productData.push(prod)
    }
    console.log(productData.name)
    res.render('TabFeedback/admin-feedback-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), allCmt: multipleToObject(allCmt), productData});
}
module.exports = { showListFB }