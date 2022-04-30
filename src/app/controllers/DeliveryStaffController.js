const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Order = require('../models/Order');

//[GET] /deliveryStaff
const showDeliStaff = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
}

//[GET] /deliveryStaff/:orderStatus
const filterStatus = async(req, res, next) => {
    const user = await User.findOne({ role: 'deliveryStaff' });
    const order = await Order.find({ orderStatus: req.params.orderStatus });
    res.render('TabAdDeliStaff/delivery-order-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), order: multipleToObject(order) });
}

//[GET] /deliveryStaff/:id/staffProfile
const showStaffProfile = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    res.render('TabAdStaff/staff-profile', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
}

//[PUT] /staff/:id
const updateStaffProfile = async(req, res, next) => {
    // const password = req.body.password;
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    await User.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        // password: hashPassword,
        avatar: req.body.avatar,
        cover: req.body.cover,
        address: req.body.address
    }).then((test) => {
        // console.log(test);
    });
    res.redirect('back')

}

module.exports = { showDeliStaff, filterStatus, showStaffProfile, updateStaffProfile }