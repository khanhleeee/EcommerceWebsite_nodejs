const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorize');

const productController = require('../app/controllers/ProductController');

router.get('/:gender', productController.filterGender)
router.get('/', ensureAuthenticated, productController.showProductList)
router.get('/detail/:id/:sku/:size', productController.showProductDetail);

module.exports = router;