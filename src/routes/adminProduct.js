const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

const adminProductController = require('../app/controllers/AdminProductController');

router.get('/deleteProduct/:id', adminProductController.deleteProduct);

router.post('/createProduct/save/:id/saveSkus', adminProductController.createSkus);
router.post('/createProduct/save', adminProductController.createProduct);

router.get('/:id/editProduct', adminProductController.showEditProduct);
router.put('/:id', adminProductController.updateProduct);

router.get('/createProduct', adminProductController.showCreateList);
router.get('/', adminProductController.showProductList);


module.exports = router;