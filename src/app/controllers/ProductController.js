const Product = require('../models/Product')
const Color = require('../models/Color')
const Category = require('../models/Category')
const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose')

// [GET] /product
const showProductList = async (req, res, next) => {

  // Find product and product variation
    let p = await Product.find();
    let colors = await Color.find();
    let categories = await Category.find();

    res.render('TabProduct/product', {layout: 'mainClient.hbs', p: multipleToObject(p), color: multipleToObject(colors), category: multipleToObject(categories)});
}

// [GET] /product/category_id
const filterGender = async (req, res, next) => {

  let p = await Product.find({gender: req.params.gender})
  let categories = await Category.find();
  let colors = await Color.find();

  res.render('TabProduct/product', {layout: 'mainClient.hbs', p: multipleToObject(p), category: multipleToObject(categories), color: multipleToObject(colors) })
}

// [GET] /id
const showProductDetail = async (req, res, next) => {
  // let colors = await Color.find();
  // let categories = await Category.find(); 

  // Product.findById({_id: req.params.id})
  //     .then(product =>        
  //       res.render('TabProduct/productdetail', {layout: 'mainClient.hbs', product: mongooseToObject(product), color: multipleToObject(colors), category: multipleToObject(categories) })
  //     )
  //     .catch(next);

  let colors = await Color.find();
  let categories = await Category.find(); 

  let product = await Product.findById({_id: req.params.id})
  var skus = product.skus;
  let sku1 = ''; 
    for(const index in skus) {
      if(`${skus[index].sku}` == req.params.sku) {
        sku1 = `${skus[index]}`;
      }
  }
  // // var myJSONString = JSON.stringify(sku1);
  // console.log(myJSONString.replace(/\'/g,"\"").replace(/\\n/g,""))

  console.log(typeof(so1))

  res.render('TabProduct/productdetail', {layout: 'mainClient.hbs', product: mongooseToObject(product), color: multipleToObject(colors), category: multipleToObject(categories) })
}

module.exports = { showProductList, filterGender, showProductDetail}


