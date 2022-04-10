const Product = require('../models/Product');
const Color = require('../models/Color');
const Category = require('../models/Category');

const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

// [GET] /product
const showProductList = async(req, res, next) => {

    // Find product and product variation
    let p = await Product.find();
    let colors = await Color.find();
    let categories = await Category.find();

    res.render('TabProduct/product', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), p: multipleToObject(p), color: multipleToObject(colors), category: multipleToObject(categories) });
}

// [GET] /product/category_id
const filterGender = async(req, res, next) => {

    let p = await Product.find({ gender: req.params.gender })

    let categories = await Category.find();
    let colors = await Color.find();

    res.render('TabProduct/product', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), p: multipleToObject(p), category: multipleToObject(categories), color: multipleToObject(colors) })
}

// [GET] /id
const showProductDetail = (req, res, next) => {
    Product.findOne({ _id: req.params.id }).populate([
            { path: 'cat_id' },
            { path: 'image_id' },
            // { path: 'image_id' },
            { path: 'p_variations.pv_id', populate: [{ path: 'vari_color' }, { path: 'vari_size' }, { path: 'SKU' }, { path: 'vari_image' }, ] }
        ])
        .then(product =>
            res.render('productdetail', { layout: 'mainClient.hbs', user: mongooseToObject(req.user), product: mongooseToObject(product) })
        )
        .catch(next);
}


module.exports = { showProductList, filterGender, showProductDetail }