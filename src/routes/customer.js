const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const customerController = require('../app/controllers/CustomerController');

router.post('/:id/customerPass', customerController.changePass);
router.get('/:id/customerPass', customerController.showCustomerPass);

router.get('/:id/customerTransaction/:id', customerController.showElementTransaction);
router.get('/:id/customerTransaction', customerController.showCustomerTransaction);

router.get('/:id/customerInfo', customerController.showCustomerInfo);
router.put('/:id', customerController.updateCustomer);

router.get('/', ensureAuthenticated, customerController.showCustomer);

module.exports = router;