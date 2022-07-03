const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const adminController = require('../app/controllers/AdminController');

router.get('/:id/adminProfile', ensureAuthenticated, adminController.showAdminProfile);
router.put('/:id', ensureAuthenticated, adminController.updateProfile);

router.post ('/filter', adminController.filter);
router.get('/', ensureAuthenticated, adminController.showAdmin);

module.exports = router;