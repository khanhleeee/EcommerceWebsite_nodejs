const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

const adminCreateController = require('../app/controllers/AdminCreateController');

router.post('/productForm/skusForm', adminCreateController.createSkus);
router.post('/:id/productForm', adminCreateController.createProduct);
// router.get('/adminCreateSkus', adminCreateController.showCreateSkus);
router.get('/', adminCreateController.showCreateList);


module.exports = router;