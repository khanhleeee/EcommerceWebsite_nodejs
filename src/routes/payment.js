const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorize');

const paymentController = require('../app/controllers/PaymentController');

router.get('/:id/order/orderSuccess', paymentController.paySuccess);

router.post('/:id/order/:id/payOrder', paymentController.payOrder);
router.get('/:id/order', paymentController.showOrder);

router.post('/promotion', paymentController.promotion);

router.post('/', paymentController.getPayment);
router.get('/', paymentController.showPayment);


module.exports = router;