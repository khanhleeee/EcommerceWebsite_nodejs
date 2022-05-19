const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');


const adminProductController = require('../app/controllers/AdminProductController');

router.get('/deleteProduct/:id', adminProductController.deleteProduct);

router.post('/createProduct/save/:id/saveSkus', adminProductController.createSkus);
router.post('/createProduct/save', adminProductController.createProduct);

router.get('/createProduct/save/:id/saveSkus', adminProductController.showEditSku);
router.get('/:id/editProduct', adminProductController.showEditProduct);
router.put('/:id', adminProductController.updateProduct);
router.put('/:id/:sku', adminProductController.updateSKu);

router.get('/createProduct', adminProductController.showCreateList);

router.get('/hideProduct/:id', adminProductController.hideProduct);
router.get('/showProduct/:id', adminProductController.showProduct);
router.get('/', ensureAuthenticated, adminProductController.showProductList);


module.exports = router;