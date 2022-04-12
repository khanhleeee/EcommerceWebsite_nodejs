const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

// [GET] /product
const showPayment = async(req, res, next) => {
   res.render('TabPayment/payment', { layout: 'mainEmpty.hbs'});
}

module.exports = {showPayment}