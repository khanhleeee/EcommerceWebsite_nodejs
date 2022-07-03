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
    res.render('TabFeedback/admin-feedback-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), allCmt: multipleToObject(allCmt) });
}

//[GET] /adminFeedback/:id/watchDetail
const watchDetail = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const cmtParticular = await Comment.findById(req.params.id);
    res.render('TabFeedback/admin-feedback-edit', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), cmtParticular: mongooseToObject(cmtParticular) });
}

//[GET] /adminCmt/hideCmt/:id
const hideCmt = async(req, res, next) => {
    await Comment.updateOne({ _id: req.params.id }, {
        isHide: true,
    });
    return res.redirect('back')
}

//[GET] /adminCmt/showCmt/:id
const showCmt = async(req, res, next) => {
    await Comment.updateOne({ _id: req.params.id }, {
        isHide: false,
    });
    return res.redirect('back');
}
module.exports = { showListFB, watchDetail, hideCmt, showCmt }