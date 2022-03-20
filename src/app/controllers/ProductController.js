const Product = require('../models/Product')
const Color = require('../models/Color')
const Size = require('../models/Size')
const Image = require('../models/Image')
const Product_var = require('../models/Product_variation')
const Category = require('../models/Category')
const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose')

// [GET] /product
const showProductList = async(req, res, next) => {

    // Find product and product variation
    try {
        let p = await Product.find().populate([
            { path: 'cat_id' },
            { path: 'p_variations.pv_id', populate: [{ path: 'vari_color' }, { path: 'vari_image' }, ] }
        ]);

        let categories = await Category.find();
        let colors = await Color.find();

        res.render('TabProduct/product', { layout: 'mainClient.hbs', p: multipleToObject(p), categories: multipleToObject(categories), colors: multipleToObject(colors) })

    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }

}

// [GET] /product/category_id
const filterCategory = async(req, res, next) => {

    let p = await Product.find().populate([{
            path: 'cat_id',
            match: { _id: req.params.id }
        },

        {
            path: 'p_variations.pv_id',
            populate: [
                { path: 'vari_color' },
                { path: 'vari_image' }
            ]
        }
    ]);;

    let categories = await Category.find();
    let colors = await Color.find();

    res.render('TabProduct/product', { p: multipleToObject(p), categories: multipleToObject(categories), colors: multipleToObject(colors) })



}

const filterColor = async(req, res, next) => {

    let p = await Product.find().populate([
        { path: 'cat_id' },

        {
            path: 'p_variations.pv_id',
            populate: [
                { path: 'vari_color', match: { _id: req.params.id } },
                { path: 'vari_image' }
            ]
        }
    ]);;

    let categories = await Category.find();
    let colors = await Color.find();

    res.render('TabProduct/product', { layout: 'mainClient.hbs', p: multipleToObject(p), categories: multipleToObject(categories), colors: multipleToObject(colors) })
    console.log(p)


}



module.exports = { showProductList, filterCategory, filterColor }