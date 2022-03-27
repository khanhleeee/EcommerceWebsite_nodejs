const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorize');

const productController = require('../app/controllers/ProductController');

router.get('/:gender', productController.filterGender)
router.get('/:id', productController.showProductDetail);
router.get('/', ensureAuthenticated, productController.showProductList)



module.exports = router;