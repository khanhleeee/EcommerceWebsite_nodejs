const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');


const User = require('../models/User');
const Order = require('../models/Order');

//[GET] /customer
const showCustomer = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    const orderCus = await Order.find({ name: userInfo.name });
    var orderTotal = 0;
    for(var i in orderCus) {
        orderCus[i].orderTotal = orderCus[i].orderTotal.replace(/,/g, '');
        // orderCus[i].orderTotal = orderCus[i].orderTotal.replace(/./g, '');
        orderTotal += parseFloat(orderCus[i].orderTotal);
    }
    var total = Intl.NumberFormat().format(orderTotal);
    if(orderTotal >= 10000000)
        User.updateOne({_id:req.user._id}, {set: {rank: 'bronze'}});
    else if(orderTotal >= 30000000)
        User.updateOne({_id:req.user._id}, {set: {rank: 'silver'}});
    else if(orderTotal >= 50000000)
        User.updateOne({_id:req.user._id}, {set: {rank: 'gold'}});
    }
    res.render('TabCustomer/cus-reward', { layout: 'mainClient.hbs', orderTotal: total, user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[GET] /customer/:id/customerInfo 
const showCustomerInfo = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    res.render('TabCustomer/cus-info', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
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

//[GET] /customer/:id/customerTransaction
const showCustomerTransaction = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    const orderCus = await Order.find({ name: userInfo.name });
    res.render('TabCustomer/cus-transaction', { layout: 'mainClient.hbs', orderCus: multipleToObject(orderCus), user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[GET] /customer/:id/customerTransaction/:id
const showElementTransaction = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    const orderCus = await Order.findById(req.params.id);
    res.render('TabCustomer/cus-transaction-element', { layout: 'mainClient.hbs', orderCus: multipleToObject(orderCus), user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[GET] /customer/:id/customerPass
const showCustomerPass = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    res.render('TabCustomer/cus-pass', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}



module.exports = { showCustomer, showCustomerInfo, updateCustomer, showCustomerTransaction, showCustomerPass, showElementTransaction }