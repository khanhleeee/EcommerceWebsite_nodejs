const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/', productController.showProductList)

router.get('/:id', productController.showProductDetail);

module.exports = router;