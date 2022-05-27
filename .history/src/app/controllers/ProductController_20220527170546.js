const Product = require('../models/Product');
const Color = require('../models/Color');
const Category = require('../models/Category');
const User = require('../models/User');
const Comment = require('../models/Comment');


const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

// [GET] /product
const showProductList = async(req, res, next) => {
    // Find product and product variation
    let p = await Product.find({ isHide: false });
    let colors = await Color.find();
    let categories = await Category.find();
    res.render('TabProduct/product', { layout: 'mainClient.hbs', userInfo: mongooseToObject(req.user), user: mongooseToObject(req.user), p: multipleToObject(p), color: multipleToObject(colors), category: multipleToObject(categories) });
}

// [GET] /product/category_id
const filterGender = async(req, res, next) => {
    // const userInfo = await User.findById(req.user._id);
    let p = await Product.find({ gender: req.params.gender })
    let categories = await Category.find();
    let colors = await Color.find();
    res.render('TabProduct/product', { layout: 'mainClient.hbs', userInfo: mongooseToObject(req.user), user: mongooseToObject(req.user), p: multipleToObject(p), category: multipleToObject(categories), color: multipleToObject(colors) })
}

// [GET] /:id/:sku
const showProductDetail = async(req, res, next) => {
    let colors = await Color.find();
    let categories = await Category.find();
    let product = await Product.findById({ _id: req.params.id })
        // Find skus[i] has sku = req.params.sku
    var skus = product.skus;
    let querySku = '';
    for (const item of skus) {
        if (`${item.sku}` == req.params.sku) {
            querySku = `${JSON.stringify(item)}`;
        }
    }
    const sku = JSON.parse(querySku)
    // Find sizes[i] has size = req.params.size
    const sizes = sku.sizes;
    let querySize = '';
    let isOutOfStock = null;
    for (const item of sizes) {
        if (`${item.size}` == req.params.size) {
            querySize = `${JSON.stringify(item)}`;
            if (`${item.qty}` <= 0)
                isOutOfStock = 'tạm hết hàng';
        }
    }
    const size = JSON.parse(querySize);

    const showUserCmt = await Comment.find({ productId: product._id})
    console.log(showCmt)

    res.render('TabProduct/productdetail', { layout: 'mainClient.hbs', userInfo: mongooseToObject(req.user), sku, size, isOutOfStock, product: mongooseToObject(product), color: multipleToObject(colors), category: multipleToObject(categories), user: mongooseToObject(req.user) })
}

// [POST] /:id/s:sku
const postComment = async (req, res, next) => {
    const { userInfo, productInfo, content} = req.body;
    const findPoster = await User.findById(userInfo);
    const savePoster = {
        namePoster: findPoster.name,
        avaPoster: findPoster.avatar,
    }
    console.log(savePoster)
    const findProduct = await Product.findById(productInfo);
    const cmt = new Comment({
        content,
        userId: savePoster,
        productId: findProduct._id,
    });
    try {
        // const newCmt = await cmt.save();
        await res.redirect('back');
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { showProductList, filterGender, showProductDetail, postComment }