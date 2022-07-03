const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

const Payment = require('../models/Payment');
const Order = require('../models/Order');


// [GET] /order
const showOrder = async(req, res, next) => {
    res.render('TabOrder/order', { layout: 'mainEmpty.hbs' });
}

module.exports = { showOrder }