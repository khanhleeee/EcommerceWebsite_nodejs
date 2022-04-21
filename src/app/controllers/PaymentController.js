const { url } = require('inspector');
const { mongooseToObject } = require('../../config/utility/mongoose');
const { multipleToObject } = require('../../config/utility/mongoose');

const Product = require('../models/Product');
const Order = require('../models/Order');
const Promotion = require('../models/Promotion');

// [GET] /payment
const showPayment = async(req, res, next) => {
    res.render('TabPayment/payment', { layout: 'mainEmpty.hbs' });
}

// [POST] /payment
const getPayment = async(req, res, next) => {
    // const { userId } = req.user;
    const { name, phonenumber, address, note, price, color, sku, size, qty, makm } = req.body;

    const findPromo = await Promotion.findOne({ makm: req.body.makm });
    if (findPromo) {
        req.session.message = {
            type: 'success',
            intro: 'Đã áp dụng mã giảm giá',
        }
    } else if (findPromo == null) {
        req.session.message = {
            type: 'info',
            intro: 'Không có mã giảm giá',
        }
    } else {
        req.session.message = {
            type: 'danger',
            intro: 'Mã giảm giá không hợp lệ',
        }
    }

    var regexNumber = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
    if (regexNumber.test(phonenumber) == false) {
        req.session.message = {
            type: 'danger',
            intro: 'Vui lòng điền chính xác số điện thoại',
        }
        return res.redirect('/payment');
    }

    const order = new Order({
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        note: req.body.note,
        orderType: req.body.orderType,
        promotion: req.body.promotion,
        items: []
    });
    for (var i in req.body.sku) {
        order.items.push({ sku: req.body.sku[i], qty: req.body.qty[i], price: req.body.price[i] })
    }
    try {
        await order.save();
        res.redirect('/payment/' + order.id + '/order');
    } catch (err) {
        res.status(400).send(err);
    }
}

// [GET] /payment/:id/order
const showOrder = async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    // // console.log(payment);
    res.render('TabOrder/order', { layout: 'mainEmpty.hbs', order: mongooseToObject(order) });
}


// [POST] /payment/:id/order/:id/payOrder
const payOrder = async(req, res, next) => {
    const orderid = await Order.findById(req.params.id);

    //Check method payment
    if (orderid.orderType === 'Momo') {
        let idurl = orderid.id;
        let nameurl = orderid.name;
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var partnerCode = "MOMOUW4Y20220414";
        var accessKey = "PxadjEKn577xXABk";
        var secretkey = "U0rXFOEyO6u1DFqpOxN7ua6G806NOqao";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = `Thanh toán đơn hàng ${nameurl}`;
        var redirectUrl = `http://localhost:3000/payment/${idurl}/order/orderSuccess`;
        var ipnUrl = "https://callback.url/notify";
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var amount = `1000`;
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
            //puts raw signature
            // console.log("--------------------RAW SIGNATURE----------------")
            // console.log(rawSignature)
            //signature
        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
        // console.log("--------------------SIGNATURE----------------")
        // console.log(signature)

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en'
        });
        //Create the HTTPS objects
        const https = require('https');
        const options = {
                hostname: 'test-payment.momo.vn',
                port: 443,
                path: '/v2/gateway/api/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            }
            //Send the request and get the response
        const req2 = https.request(options, res2 => {
            // console.log(`Status: ${res2.statusCode}`);
            // console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res2.setEncoding('utf8');
            var url = [];
            res2.on('data', (body) => {
                // console.log('Body: ');
                // console.log(body);
                if (body.resultCode != 0) {
                    try {
                        req.session.message = {
                            type: 'danger',
                            intro: 'Có lỗi xảy ra, vui lòng thử lại sau',
                        }
                    } catch (error) {
                        return res.status(400).send(err);
                    }
                }
                console.log('payUrl: ');
                console.log(JSON.parse(body).payUrl);
                url.push(JSON.parse(body).payUrl);
            });
            res2.on('end', () => {
                // console.log('No more data in response.');
                res.redirect(url);
            });
        })

        req2.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        // console.log("Sending....")
        req2.write(requestBody);
        req2.end();
    } else if (orderid.orderType === 'COD') {
        try {
            req.session.message = {
                type: 'success',
                intro: 'Đơn hàng đã được gửi đến cửa hàng, vui lòng đợi xác nhận',
            }
        } catch (error) {
            return res.status(400).send(err);
        }
        res.redirect('/payment/' + orderid.id + '/order/orderSuccess');
    }
}

//[GET] /payment/:id/order/orderSuccess
const paySuccess = async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    res.render('TabOrder/orderSuccess', { layout: 'mainEmpty.hbs', order: mongooseToObject(order) });

}

module.exports = { showPayment, getPayment, showOrder, payOrder, paySuccess }