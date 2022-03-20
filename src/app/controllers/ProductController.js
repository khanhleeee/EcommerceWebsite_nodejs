const Product = require('../models/Product')
const Color = require('../models/Color')
const Size = require('../models/Size')
const Image = require('../models/Image')
const Sku = require('../models/Sku')
const Product_var = require('../models/Product_variation')
const Category = require('../models/Category')
const { multipleToObject } = require('../../config/utility/mongoose');
const { mongooseToObject } = require('../../config/utility/mongoose');

// [GET] /product
const showProductList = async(req, res, next) => { 

   // Find product and product variation
   try {
    let p = await Product.find().populate([
      { path: 'cat_id' },
      { path: 'image_id' },
      { path: 'p_variations.pv_id', populate: [{ path: 'vari_color' }, { path: 'vari_image' },] }
    ]);

    let categories = await Category.find();
    let colors = await Color.find();

    res.render('product', { p: multipleToObject(p), categories: multipleToObject(categories), colors: multipleToObject(colors) })

  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
  }


// [GET] /id
const showProductDetail = (req, res, next) => {
  Product.findOne({_id: req.params.id}).populate([
    { path: 'cat_id' },
    { path: 'image_id' },
    // { path: 'image_id' },
    { path: 'p_variations.pv_id', populate: [{ path: 'vari_color' }, { path: 'vari_size' }, { path: 'SKU' }, { path: 'vari_image' },] }
  ])
      .then(product =>        
        res.render('productdetail', { product: mongooseToObject(product) })
      )
      .catch(next);
}

module.exports = {showProductList, showProductDetail}