const Product = require('../models/Product');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /adminCreateList
const showCreateList = async(req, res, next) => {
    res.render('TabAdmin/admin-product-form', { layout: 'mainAdmin.hbs' });
}

//[GET] /adminCreateSkus
// const showCreateSkus = async(req, res, next) => {
//     res.render('TabAdmin/admin-skus-form', { layout: 'mainAdmin.hbs' });
// }

//[POST] /adminCreateList/productForm
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

    // res.redirect('/adminList')

    console.log(product1)

    res.render('TabAdmin/admin-skus-form', { layout: 'mainAdmin.hbs' });
}

// [POST] /adminCreateList/productForm/skusForm
const createSkus = async(req, res, next) => {

    const product = await Product.updateOne({ _id: req.params.id }, {
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
        .then(() => res.redirect('/adminList'))
        .catch(next);

    console.log(product)

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

module.exports = { showCreateList, createProduct, createSkus }