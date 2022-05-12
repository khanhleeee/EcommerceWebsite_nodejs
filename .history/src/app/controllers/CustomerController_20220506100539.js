const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

const bcrypt = require('bcryptjs');

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
    if(orderTotal >= 10000000) {
        await User.updateOne({_id:req.user._id}, {$set: {rank: 'bronze'}});
    }
    else if(orderTotal >= 30000000) {
        await User.updateOne({_id:req.user._id}, {$set: {rank: 'silver'}})
    }
    else if(orderTotal >= 50000000) {
        await User.updateOne({_id:req.user._id}, {$set: {rank: 'gold'}});
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
    const order = await Order.find({ name: userInfo.name });

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
    res.render('TabCustomer/cus-transaction', { layout: 'mainClient.hbs', orderCus: multipleToObject(order), products, user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[GET] /customer/elementTransaction/:id
const showElementTransaction = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    const orderCus = await Order.findById(req.params.id);
    if (orderCus.orderType == "Momo") {
        var orderTotal = orderCus.orderTotalPromo;
    }
    if (orderCus.orderPromoName != "") {
        var orderTotalPromo = orderCus.orderTotalPromo;
    }
    res.render('TabCustomer/cus-transaction-element', { layout: 'mainClient.hbs', orderCus: mongooseToObject(orderCus), user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo), orderTotal, orderTotalPromo });
}

//[GET] /customer/:id/customerPass
const showCustomerPass = async(req, res, next) => {
    const userInfo = await User.findById(req.user._id);
    res.render('TabCustomer/cus-pass', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: mongooseToObject(userInfo) });
}

//[PUT] /customer/:id/customerPass
const changePass = async(req, res, next) => {
    const { passwordOld, password, passwordConf } = req.body;

    const user = await User.findOne({ _id: req.params.id });
    const checkOldPass = bcrypt.compare(passwordOld, user.password);

    if (!checkOldPass) {
        req.session.message = {
            type: 'danger',
            intro: 'Mật khẩu không đúng !',
        }
        return res.redirect('/customer/' + req.user._id + '/customerPass');
    } else {
        if (password != passwordConf) {
            req.session.message = {
                type: 'danger',
                intro: 'Mật khẩu không khớp !',
            }
            return res.redirect('/customer/' + req.user._id + '/customerPass');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await User.updateOne({ _id: req.params.id }, {
                password: hashPassword,
            });
            req.session.message = {
                type: 'success',
                intro: 'Đổi mật khẩu thành công !',
            }
            return res.redirect('/customer/' + req.user._id + '/customerPass');
        }
    }
    // res.redirect('/customer/' + req.user._id + '/customerPass');

}


module.exports = { showCustomer, showCustomerInfo, updateCustomer, showCustomerTransaction, showElementTransaction, showCustomerPass, changePass, }