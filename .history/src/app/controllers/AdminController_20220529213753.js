const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

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

    // const test = await Order.aggregate([{
    //     $match: { "orderStatus": "done" }
    // },
    // {
    //     $group: {
    //         _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
    //         // _id: '$hour',
    //         price: { $sum: parseInt("$orderTotal") },
    //         total: { $sum: 1 }
    //     }
    // }]);
    // console.log(test)

    const dataHour = await Order.aggregate([{
                $match: { "orderStatus": "done" }
            },
            // {
            //     $project: {
            //         "hour": {
            //             $hour: { date: "$createdAt", timezone: "+07:00" }
            //         },
            //     }
            // },
            {
                $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
                    // _id: '$hour',
                    price: { $sum: parseInt("$orderTotal") },
                    total: { $sum: 1 }
                }
            }
        ])
        // console.log('hour', dataHour);
    const objHour = Object.assign({}, dataHour);

    const dataDay = await Order.aggregate([{
                $match: { "orderStatus": "done" }
            },
            {
                $project: {
                    "day": {
                        $dayOfMonth: { date: "$createdAt", timezone: "+07:00" }
                    },
                }
            },
            {
                $group: {
                    _id: '$day',
                    total: { $sum: 1 }
                }
            }
        ])
        // console.log('day', dataDay);
    const objDay = Object.assign({}, dataDay);


    const dataMonth = await Order.aggregate([{
            $match: { "orderStatus": "done" }
        },
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
        }
    ]);
    // console.log('day', dataMonth);
    const objMonth = Object.assign({}, dataMonth);

    res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', objHour, objDay, objMonth, orderSuccess, orderFail, user: mongooseToObject(user), product: mongooseToObject(product), order: multipleToObject(order), order2: multipleToObject(order2) });
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