const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');


const adminOrderController = require('../app/controllers/AdminOrderController');
const { route } = require('./payment');

router.get('/deleteOrder/:id', adminOrderController.deleteOrder);

router.get('/:id/editOrder/confirmOrder', adminOrderController.confirmOrder);
router.get('/:id/editOrder/cancelOrder', adminOrderController.cancelOrder);

router.get('/:id/editOrder/confirmOrder', adminOrderController.confirmOrder);
router.get('/:id/editOrder', adminOrderController.showEditOrder);
router.put('/:id', adminOrderController.updateOrder);


router.get('/:orderStatus', adminOrderController.filterStatus);
router.get('/', ensureAuthenticated, adminOrderController.showOrder);


module.exports = router;