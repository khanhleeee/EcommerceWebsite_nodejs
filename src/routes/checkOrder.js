const express = require('express');
const router = express.Router();

const CheckOrderController = require('../app/controllers/CheckOrderController');

router.get('/', CheckOrderController.showCheckOrder);

router.post('/show', CheckOrderController.CheckOrderList);

router.get('/:id/detail', CheckOrderController.showCheckOrderDetail);

module.exports = router;