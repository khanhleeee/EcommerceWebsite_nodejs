const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');


const adminOrderController = require('../app/controllers/AdminOrderController');

router.get('/deleteOrder/:id', adminOrderController.deleteOrder);

router.get('/:id/editOrder', adminOrderController.showEditOrder);
router.put('/:id', adminOrderController.updateOrder);

router.get('/', ensureAuthenticated, adminOrderController.showOrder);


module.exports = router;