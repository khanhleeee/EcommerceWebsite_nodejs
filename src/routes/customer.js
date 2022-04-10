const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const customerController = require('../app/controllers/CustomerController');

router.get('/:id/customerInfo', ensureAuthenticated, customerController.showCustomerInfo);
router.put('/:id', customerController.updateCustomer);

router.get('/', ensureAuthenticated, customerController.showCustomer);

module.exports = router;