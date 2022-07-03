const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const deliveryStaffController = require('../app/controllers/DeliveryStaffController');

router.put('/:id', deliveryStaffController.updateStaffProfile);
router.get('/:id/staffProfile', deliveryStaffController.showStaffProfile);

router.get('/:orderStatus', deliveryStaffController.filterStatus);

router.get('/', ensureAuthenticated, deliveryStaffController.showDeliStaff);

module.exports = router;