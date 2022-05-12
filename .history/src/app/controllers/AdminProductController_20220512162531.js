const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

const Product = require('../models/Product');
const User = require('../models/User');

//[GET] /adminProduct
const showProductList = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const products = await Product.find({});
    res.render('TabAdmin/admin-product-list', { layout: 'mainAdmin.hbs', products: multipleToObject(products), user: mongooseToObject(user) });
}

//[GET] /adminProduct/createProduct
const showCreateList = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    res.render('TabAdmin/admin-product-form', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
}

//[POST] /adminProduct/createProduct/save
const createProduct = async(req, res, next) => {
    const { name, category, price, gender, sizes, qty } = req.body;
    // res.json(req.body)
    const product = new Product({
        name,
        category,
        gender,
        price,
    });
    await product.save();
    if(typeof(req.body.sizes) === 'object') {
        await Product.findOneAndUpdate({ _id: product._id }, {
            $push: {
                skus: [{
                    sku: req.body.sku,
                    img: req.body.img,
                    color: {
                        title: req.body.color_name,
                        color_code: req.body.color_id,
                    },
                    sizes: []
                }]
            }
        }, { new: true });

        for(var i = 0; i < req.body.sizes.length; i++) {
            await Product.updateOne(
                    {_id: product._id, 'skus.sku': req.body.sku},
                    { $push: {
                        'skus.$.sizes': {size: req.body.sizes[i], qty: req.body.qty[i]}
                    }},
                    // {arrayFilters: [{'skus.sku': order.items[i].size}]}
                )
        }
    }
    else {
        await Product.findOneAndUpdate({ _id: product._id }, {
            $push: {
                skus: [{
                    sku: req.body.sku,
                    img: req.body.img,
                    color: {
                        title: req.body.color_name,
                        color_code: req.body.color_id,
                    },
                    sizes: [{
                        size: req.body.sizes, 
                        qty: req.body.qty,
                    }]
                }]
            }
        }, { new: true });
    }


    const user = await User.findOne({ role: 'admin' });
    Product.findById(product._id)
        .then(p => {
            console.log(p);
            res.render('TabAdmin/admin-skus-form', { layout: 'mainAdmin.hbs', p: mongooseToObject(p), user: mongooseToObject(user) });
        })
}

// [POST] /adminProduct/createProduct/save/:id/saveSkus
const createSkus = async(req, res, next) => {
    if(typeof(req.body.sizes) === 'object') {
        await Product.updateOne({ _id: req.params.id }, {
            $push: {
                skus: [{
                    sku: req.body.sku,
                    img: req.body.img,
                    color: {
                        title: req.body.color_name,
                        color_code: req.body.color_id,
                    },
                    sizes: []
                }]
            }
        }, { new: true });

        for(var i = 0; i < req.body.sizes.length; i++) {
            await Product.updateOne(
                    {_id: req.params.id, 'skus.sku': req.body.sku},
                    { $push: {
                        'skus.$.sizes': {size: req.body.sizes[i], qty: req.body.qty[i]}
                    }},
                    // {arrayFilters: [{'skus.sku': order.items[i].size}]}
                )
        }
    }
    else {
        await Product.updateOne({ _id: req.params.id }, {
            $push: {
                skus: [{
                    sku: req.body.sku,
                    img: req.body.img,
                    color: {
                        title: req.body.color_name,
                        color_code: req.body.color_id,
                    },
                    sizes: [{
                        size: req.body.sizes,
                        qty: req.body.qty,
                    }]
                }]
            }
        }, { new: true });
    }
    // const product1 = await Product.findById(req.params.id);

    // const product = new Product.findById({ id: req.params.id }, function(err, product) {
    //     sku, 
    //     img,
    //     color,
    //     sizes
    // });
    // const product = new Product.findById(req.params.id, {
    //         $push: {
    //             skus: {
    //                 sku,
    //                 img,
    //                 color,   
    //                 sizes
    //             }
    //         }
    //     },
    //     function(err, product) {
    //         console.log(product);
    //     });
    // console.log(req.body);
    // await product.save();
    // res.json(req.body);  
    // res.redirect('/admin/adminCreateList/step2');
    
}

//[GET] /adminProduct/:id/editProduct
const showEditProduct = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const product = await Product.findById(req.params.id);
    res.render('TabAdmin/admin-edit-form', { layout: 'mainAdmin.hbs', product: mongooseToObject(product), user: mongooseToObject(user) });
}

//[PUT] /adminProduct/:id
const updateProduct = async(req, res, next) => {
    await Product.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        category: req.body.category,
        gender: req.body.gender,
        price: req.body.price,
    });
    
    // if(typeof req.body.sku !== 'object') {
    //     await Product.updateOne(
    //         {_id: req.params.id, "skus.sku": req.body.sku}, {
    //         $set: {
    //             'skus.$.sku': req.body.sku,
    //             'skus.$.img': req.body.img,
    //             'skus.$.color.title': req.body.color_name,
    //             'skus.$.color.color_code': req.body.color_id,
    //         },
    //     }).then(data => {
    //         console.log(data);
    //     });
    // }
    res.redirect('back')
}

//[PUT] /adminProduct/:id/:sku
const updateSKu = async(req, res, next) => {
    const object = {
        sku: req.body.sku,
        img: req.body.img,
        color: {
            title: req.body.color_name,
            color_code: req.body.color_id,
        },
        sizes: []
    }
    for(var i in req.body.sizes) {
        console.log(req.body.sizes[i]);
    }
    // await Product.updateOne({ _id: req.params.id }, {
    //     name: req.body.name,
    //     category: req.body.category,
    //     gender: req.body.gender,
    //     price: req.body.price,
    // });
    res.redirect('editProduct');
}

//[PUT] /adminProduct/:id/:sku/edit
const showEditSku = async(req, res, next) => { 
    const user = await User.findOne({ role: 'admin' });
    const product = await Product.findById(req.params.id);
    var sku = '';
    for(var item of product.skus) {
        if(`${item.sku}` === req.params.sku)
            sku = `${JSON.stringify(item)}`
    }
    const productSku = JSON.parse(sku);
    res.render('TabAdmin/admin-skus-edit', { layout: 'mainAdmin.hbs', product: mongooseToObject(product), sku: productSku, user: mongooseToObject(user) });
}

//[DELETE] /adminProduct/deleteProduct/:id
const deleteProduct = async(req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/adminProduct'))
        .catch(next);
}

module.exports = { showProductList, showCreateList, createProduct, createSkus, showEditProduct, showEditSku, updateProduct, updateSKu, deleteProduct }