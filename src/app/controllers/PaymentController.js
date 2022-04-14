const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

const Payment = require('../models/Payment');

// [GET] /payment
const showPayment = async(req, res, next) => {
    res.render('TabPayment/payment', { layout: 'mainEmpty.hbs' });
}

// [POST] /payment/payCOD
const payCOD = async(req, res, next) => {
    // const { userId } = req.user;
    const { paymentStatus, paymentType, name, phonenumber, address, note } = req.body;
    var regexNumber = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
    if (regexNumber.test(phonenumber) == false) {
        req.session.message = {
            type: 'danger',
            intro: 'Vui lòng điền chính xác số điện thoại',
        }
        return res.redirect('/payment');
    }

    const payment = new Payment({
        paymentStatus: req.body.paymentStatus,
        paymentType: req.body.paymentType,
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        note: req.body.note,
    });
    try {
        await payment.save();
        // console.log(payment.id)
        res.redirect('/payment/' + payment.id + '/order');
    } catch (err) {
        res.status(400).send(err);
    }
}

// [GET] /payment/:id/order
const showOrder = async(req, res, next) => {
    const payment = await Payment.findById(req.params.id);
    // console.log(payment);
    res.render('TabOrder/order', { layout: 'mainEmpty.hbs', payment: mongooseToObject(payment) });
}

module.exports = { showPayment, payCOD, showOrder }