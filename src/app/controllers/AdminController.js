const Product = require('../models/Product');
const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /admin
const showAdmin = async(req, res, next) => {
    User.findOne({ role: 'admin' }).then((user) => {
        res.render('TabAdmin/admin-info', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
    })
}

//[GET] /adminList
const showProductList = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const products = await Product.find({});
    res.render('TabAdmin/admin-product-list', { layout: 'mainAdmin.hbs', products: multipleToObject(products), user: mongooseToObject(user) });

}

//[GET] /adminCreateList
const showCreateList = async(req, res, next) => {
    User.findOne({ role: 'admin' }).then((user) => {
        console.log(user);
        res.render('TabAdmin/admin-product-form', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
    })
}



//[DELETE] /adminList/:id
const deleteProduct = async(req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
}


module.exports = { showProductList, showAdmin, showCreateList, deleteProduct }