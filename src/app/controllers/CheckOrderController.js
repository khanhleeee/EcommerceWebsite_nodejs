const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');



const { mongooseToObject, multipleToObject } = require('../../config/utility/mongoose')

//[GET] /
const showCheckOrder = async(req, res, next) => {
    res.render('TabCheckOrder/checkOrder', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), userInfo: req.user });
}

//[GET] /adminOrder/:orderStatus
const CheckOrderList = async(req, res, next) => {
    const inputPhoneNumber = req.body.phoneNumber;
    const order = await Order.find({ phonenumber: inputPhoneNumber });
    console.log(inputPhoneNumber);
    
    res.render('TabCheckOrder/showCheckOrder', { layout: 'mainClient.hbs', order: multipleToObject(order)});
}

//[GET] /adminOrder/:id/editOrder
const showCheckOrderDetail = async(req, res, next) => {
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
    res.render('TabCheckOrder/checkOrderDetail', { layout: 'mainClient.hbs', user: mongooseToObject(user), order: mongooseToObject(order), products: products});
}



module.exports = { showCheckOrder, CheckOrderList, showCheckOrderDetail }