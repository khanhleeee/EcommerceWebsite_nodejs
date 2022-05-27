const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /admin
const showAdmin = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const product = await Product.findOne({ name: 'ELAN EARRINGS' });
    const order = await Order.find();
    const order2 = await Order.findOne({ orderStatus: 'danger' });

    let sum = 0;
    for (var i in order) {
        if (order[i].orderStatus == 'success') {
            sum++
            var orderSuccess = sum

        }
        if (order[i].orderStatus == 'danger') {
            sum++
            var orderFail = sum
        }
    }
    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', orderSuccess: orderSuccess, orderFail: orderFail, user: mongooseToObject(user), product: mongooseToObject(product), order: multipleToObject(order), order2: mongooseToObject(order2) });
}

//[GET] /admin/:id/adminProfile
const showAdminProfile = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    res.render('TabAdmin/admin-profile', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
}

//[PUT] /admin/:id
const updateProfile = async(req, res, next) => {
    await User.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        cover: req.body.cover,
        address: req.body.address
    }).then((test) => {
        // console.log(test);
    });

    res.redirect('/admin/' + req.user._id + '/adminProfile');
}

module.exports = { showAdmin, showAdminProfile, updateProfile }