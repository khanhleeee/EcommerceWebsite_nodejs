const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');
const { object } = require('joi');

//[GET] /admin
const showAdmin = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const product = await Product.findOne({ name: 'ELAN EARRINGS' });
    const order = await Order.find({ orderStatus: 'done' });
    const order2 = await Order.find({ orderStatus: 'danger' });

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

    const dataHour = await Order.aggregate(
        [
            {$match: { "orderStatus": "done" }},
        {
            $group: 
            {
                _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
                price: 
                { $sum: {
                    $convert: {
                        input: {
                            $reduce: {
                                input: {
                                    $split: ['$orderTotal', ',']
                                },
                                initialValue: '',
                                in: {
                                    $concat: ['$$value', '$$this']
                                }
                            }
                        },
                        to: 'int',
                        onError: 0
                    }
                }},
                count: { $sum: 1 }
            }
        },
    ])

    const objHour = Object.assign({}, dataHour);
    for(var i in objHour) {
        objHour[i].price = Intl.NumberFormat().format(objHour[i].price);
    }
    const dataDay = await Order.aggregate(
        [
            {
                $project: {
                    "day": {$dayOfMonth: { date: "$createdAt", timezone: "+07:00" }},
                }
            },
            {
                $group: {
                    _id: '$day',
                    total: { $sum: 1 }
                }
            },
            {$match: { "orderStatus": "done" }}
        ])
    const objDay = Object.assign({}, dataDay);
    console.log(objDay);
    const dataMonth = await Order.aggregate([
        {
            $project: {
                month: { $month: '$createdAt' },
            }
        },
        {
            $group: {
                _id: '$month',
                total: { $sum: 1 }
            }
        },
        {$match: { "orderStatus": "done" }}
    ]);
    // console.log('day', dataMonth);
    const objMonth = Object.assign({}, dataMonth);

    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', objHour, objDay, objMonth, orderSuccess, orderFail, user: mongooseToObject(user), product: mongooseToObject(product), order: multipleToObject(order), order2: multipleToObject(order2) });
}

const filter = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const {startDate, endDate} = req.body;
    var start = new Date(startDate);
    var end = new Date(endDate);
    const query = await Order.aggregate(
        [
            {$match: { "orderStatus": "done", "createdAt": {$gte: start, $lte: end}}},
            
        {
            $group: 
            {
                _id: "$createdAt",
                price: 
                { $sum: {
                    $convert: {
                        input: {
                            $reduce: {
                                input: {
                                    $split: ['$orderTotal', ',']
                                },
                                initialValue: '',
                                in: {
                                    $concat: ['$$value', '$$this']
                                }
                            }
                        },
                        to: 'int',
                        onError: 0
                    }
                }},
            }
        },
    ])
    const objHour = Object.assign({}, query);
    console.log(objHour);
    for(let i in objHour) {
        console.log(objHour[i]._id.getTime() > end.getTime());
    }

    var total = 0;
    for(var i in objHour) {
        total += parseFloat(objHour[i].price);
    }
    total = Intl.NumberFormat().format(total);
    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', objHour, total, user: mongooseToObject(user)});
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

module.exports = { showAdmin, showAdminProfile, updateProfile, filter}