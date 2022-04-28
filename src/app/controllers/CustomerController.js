const { mongooseToObject } = require('../../config/utility/mongoose');

const User = require('../models/User');

//[GET] /customer
const showCustomer = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    res.render('TabCustomer/customerPage', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[GET] /customer/:id/customerInfo
const showCustomerInfo = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    res.render('TabCustomer/customerInfo', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[PUT] /customer/:id/
const updateCustomer = async(req, res, next) => {
    await User.updateOne({ _id: req.params.id }, {
        avatar: req.body.avatar,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
    });

    res.redirect('/customer/' + req.user._id + '/customerInfo');
}

module.exports = { showCustomer, showCustomerInfo, updateCustomer }