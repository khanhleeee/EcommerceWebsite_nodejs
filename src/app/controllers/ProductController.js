// [GET] /product
const showProductList = async(req, res, next) => {
   res.render('product');
}

module.exports = {showProductList}