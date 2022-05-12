const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

//[GET] /adminOrder
const showOrder = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const order = await Order.find();
    res.render('TabAdOrder/admin-order-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), order: multipleToObject(order) });
}

//[GET] /adminOrder/:orderStatus
const filterStatus = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const order = await Order.find({ orderStatus: req.params.orderStatus });
    res.render('TabAdOrder/admin-order-list', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), order: multipleToObject(order) });
}

//[GET] /adminOrder/:id/editOrder
const showEditOrder = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const order = await Order.findById(req.params.id);
    const products = [];
    for (var i in order.items) {
        var product = await Product.findOne({ "skus.sku": order.items[i].sku});
        for(var j in product.skus) {
            if(product.skus[j].sku == order.items[i].sku){
                for(var y in product.skus[j].sizes) {
                    if(product.skus[j].sizes[y].size == order.items[i].size) {
                        var item = {
                            p_name: product.name,
                            sku: product.skus[j].sku,
                            color: product.skus[j].color.title,
                            size: product.skus[j].sizes[y].size,
                            qty: order.items[i].qty,
                            price: order.items[i].price,
                        }
                        products.push(item);
                    }
                }
            }
        }
    }
    res.render('TabAdOrder/admin-order-edit', { layout: 'mainAdmin.hbs', user: mongooseToObject(user), order: mongooseToObject(order), products: products});
}

//[PUT] /adminOrder/:id/editOrder/confirmOrder
const confirmOrder = async(req, res, next) => {
    await Order.updateOne({ _id: req.params.id }, {
        orderStatus: "success"
    });

    const order = await Order.findOne({ _id: req.params.id });
    for (var i in order.items) {
        Product.updateOne({ "skus.sku": order.items[i].sku }, { $inc: { 'skus.$.sizes.$[size].qty': (-1 * order.items[i].qty) } }, { arrayFilters: [{ 'size.size': order.items[i].size }] }).then(console.log('updated'))
    }
    res.redirect('/adminOrder/${req.params.id}/editOrder');
}

//[PUT] /adminOrder/:id/editOrder/cancelOrder
const cancelOrder = async(req, res, next) => {
    await Order.updateOne({ _id: req.params.id }, {
        orderStatus: "danger",
    });
    res.redirect('/adminOrder');
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

module.exports = { showOrder, filterStatus, showEditOrder, confirmOrder, cancelOrder, updateOrder, deleteOrder }