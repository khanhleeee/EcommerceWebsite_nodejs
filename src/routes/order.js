const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorize');

const orderController = require('../app/controllers/OrderController');

router.get('/', orderController.showOrder);


module.exports = router;