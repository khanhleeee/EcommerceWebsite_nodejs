const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/', productController.showProductList)
router.get('/query/:id', productController.filterCategory)

module.exports = router;