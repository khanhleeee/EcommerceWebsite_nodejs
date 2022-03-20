const Product = require('../models/Product')
const Color = require('../models/Color')
const Size = require('../models/Size')
const Image = require('../models/Image')
const Product_var = require('../models/Product_variation')
const Gender = require('../models/Gender')
const Category = require('../models/Category')
const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose')

// [GET] /product
const showProductList = async (req, res, next) => {

  // Find product and product variation
    let p = await Product.find();
    let colors = await Color.find();
    let categories = await Category.find();

    res.render('product', { p: multipleToObject(p), color: multipleToObject(colors), category: multipleToObject(categories)});
}

// [GET] /product/category_id
const filterGender = async (req, res, next) => {

  let p = await Product.find({gender: req.params.gender})

  let categories = await Category.find();
  let colors = await Color.find();

  res.render('product', { p: multipleToObject(p), category: multipleToObject(categories), color: multipleToObject(colors) })

}


module.exports = { showProductList, filterGender}