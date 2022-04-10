const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/:gender', productController.filterGender)
router.get('/:id', productController.showProductDetail);
router.get('/', productController.showProductList)



module.exports = router;