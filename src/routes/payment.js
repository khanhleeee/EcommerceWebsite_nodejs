const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorize');

const paymentController = require('../app/controllers/PaymentController');

router.get('/:id/order', paymentController.showOrder);
router.post('/', paymentController.payCOD);
router.get('/', paymentController.showPayment);


module.exports = router;