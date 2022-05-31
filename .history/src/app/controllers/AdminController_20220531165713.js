const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');
const { object } = require('joi');

//[GET] /admin
const showAdmin = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const dataHour = await Order.aggregate(
        [
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
            },
        },
        {$match: { "orderStatus": "done", "createdAt": new Date()}}
    ])
    const objHour = Object.assign({}, dataHour);
    var total = 0;
    for(var i in objHour) {
        total += parseFloat(objHour[i].price);
    }
    total = Intl.NumberFormat().format(total);

    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', objHour, total, user: mongooseToObject(user)});
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
    const countOrder = query.length;
    for(let i in objHour) {
        console.log(objHour[i]._id.getTime() < end.getTime() && objHour[i]._id.getTime() > start.getTime());
    }
    var total = 0;
    for(var i in objHour) {
        total += parseFloat(objHour[i].price);
    }
    total = Intl.NumberFormat().format(total);
    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs',  objHour, total, countOrder, user: mongooseToObject(user)});
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