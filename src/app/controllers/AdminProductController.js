const Product = require('../models/Product');
const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

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
    const { name, category, price, gender } = req.body;
    const product = new Product({
        name,
        category,
        gender,
        price,
    });
    await product.save();

    const product1 = await Product.findOneAndUpdate({ _id: product._id }, {
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

    const user = await User.findOne({ role: 'admin' });
    Product.findById(product._id)
        .then(p => {
            console.log(p);
            res.render('TabAdmin/admin-skus-form', { layout: 'mainAdmin.hbs', p: mongooseToObject(p), user: mongooseToObject(user) });
        })
}

// [POST] /adminProduct/createProduct/save/:id/saveSkus
const createSkus = async(req, res, next) => {
    const product1 = await Product.findById(req.params.id);
    console.log(product1)

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
        }, { new: true })
        .then(p => {
            console.log(p);
            res.send('Đã lưu skus thành công, cần sửa UI');
        })
        .catch(next);

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
    const p = await Product.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        category: req.body.category,
        gender: req.body.gender,
        price: req.body.price,
        //     $push: {
        //         skus: [{
        //             sku: req.body.sku,
        //             img: req.body.img,
        //             color: {
        //                 title: req.body.color_name,
        //                 color_code: req.body.color_id,
        //             },
        //             sizes: [{
        //                 size: req.body.sizes,
        //                 qty: req.body.qty,
        //             }]
        //         }]
        //     }
        // }, { new: true });
    });
    // console.log(p)
    res.redirect('/adminProduct')
}

//[DELETE] /adminProduct/deleteProduct/:id
const deleteProduct = async(req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/adminProduct'))
        .catch(next);
}


module.exports = { showProductList, showCreateList, createProduct, createSkus, showEditProduct, updateProduct, deleteProduct }