const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

//[GET] /adminOrder
const showOrder = async(req, res, next) => {
    const order = await Order.find();
    res.render('TabAdOrder/admin-order-list', { layout: 'mainAdmin.hbs', order: multipleToObject(order) });
}

//[GET] /adminOrder/:id/editOrder
const showEditOrder = async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    const item = await Order.find();
    res.render('TabAdOrder/admin-order-edit', { layout: 'mainAdmin.hbs', order: mongooseToObject(order), item: multipleToObject(item) });
}

//[PUT] /adminOrder/:id
const updateOrder = async(req, res, next) => {
    await Order.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
    });
    res.redirect('/adminOrder')
}


//[DELETE] /adminOrder/deleteOrder/:id
const deleteOrder = async(req, res, next) => {
    Order.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/adminOrder'))
        .catch(next);
}

module.exports = { showOrder, showEditOrder, updateOrder, deleteOrder }